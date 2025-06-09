import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from Database import connect_to_db  # Correct function name
import smtplib
from email.message import EmailMessage
from flask_cors import CORS
app = Flask(__name__)
CORS(app, supports_credentials=True)
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
BONAFIDE_FOLDER = os.path.join(UPLOAD_FOLDER, 'bonafide')
ESSAY_FOLDER = os.path.join(UPLOAD_FOLDER, 'essay')

os.makedirs(BONAFIDE_FOLDER, exist_ok=True)
os.makedirs(ESSAY_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file(file, folder):
    filename = secure_filename(file.filename)
    file_path = os.path.join(folder, filename)
    file.save(file_path)
    return filename
def create_article():
    article_type = request.form.get('article_type')
    username = request.form.get('username')
    mobile_number = request.form.get('mobile_number')
    bonafide = request.files.get('bonafide_file')
    essay = request.files.get('essay_file')
    email = request.form.get('email')
    # Debug log for missing fields
    print(f"Received: article_type={article_type}, username={username}, mobile_number={mobile_number}, bonafide={bonafide}, essay={essay} email={email}" )

    if not all([article_type, username, mobile_number, bonafide, essay]):
        return jsonify({'error': 'All fields are required'}), 400

    if not (allowed_file(bonafide.filename) and allowed_file(essay.filename)):
        return jsonify({'error': 'Only PDF, DOC, DOCX files allowed'}), 400

    bonafide_filename = save_file(bonafide, BONAFIDE_FOLDER)
    essay_filename = save_file(essay, ESSAY_FOLDER)

    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS student_articles (
        id SERIAL PRIMARY KEY,
        article_type TEXT NOT NULL,
        username TEXT NOT NULL,
        mobile_number TEXT NOT NULL,
        bonafide_file TEXT NOT NULL,
        essay_file TEXT NOT NULL,
        email TEXT NOT NULL
        )
    ''')

    # Insert into the same table you just created
    cur.execute('''
        INSERT INTO student_articles (article_type, username, mobile_number, bonafide_file, essay_file , email)
        VALUES (%s, %s, %s, %s, %s ,%s)
    ''', (article_type, username, mobile_number, bonafide_filename, essay_filename,email))

    conn.commit()
    conn.close()

    return jsonify({'message': 'Submission created successfully'})
def get_all_articles():
    conn = connect_to_db()
    cur = conn.cursor()  # <-- Define cursor here
    cur.execute("SELECT * FROM student_articles ORDER BY id DESC")
    rows = cur.fetchall()
    
    # Now get column names from cur.description
    column_names = [desc[0] for desc in cur.description]
    
    articles = [dict(zip(column_names, row)) for row in rows]
    conn.close()
    
    return jsonify({'data': articles})
def get_article_by_id(id):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM student_articles WHERE id = %s", (id,))
    row = cur.fetchone()
    conn.close()
    if row:
        return jsonify(dict(zip([col.name for col in cur.description], row)))
    return jsonify({'error': 'Submission not found'}), 404

def update_article(id):
    article_type = request.form.get('article_type')
    username = request.form.get('username')
    mobile_number = request.form.get('mobile_number')
    bonafide = request.files.get('bonafide_file')
    essay = request.files.get('essay_file')

    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM student_articles WHERE id = %s", (id,))
    row = cur.fetchone()
    if not row:
        return jsonify({'error': 'Submission not found'}), 404

    update_fields = []
    values = []

    if article_type:
        update_fields.append("article_type = %s")
        values.append(article_type)
    if username:
        update_fields.append("username = %s")
        values.append(username)
    if mobile_number:
        update_fields.append("mobile_number = %s")
        values.append(mobile_number)
    if bonafide and allowed_file(bonafide.filename):
        bonafide_filename = save_file(bonafide, BONAFIDE_FOLDER)
        update_fields.append("bonafide_file = %s")
        values.append(bonafide_filename)
    if essay and allowed_file(essay.filename):
        essay_filename = save_file(essay, ESSAY_FOLDER)
        update_fields.append("essay_file = %s")
        values.append(essay_filename)

    if update_fields:
        values.append(id)
        sql = f"UPDATE student_submissions SET {', '.join(update_fields)} WHERE id = %s"
        cur.execute(sql, values)
        conn.commit()

    conn.close()
    return jsonify({'message': 'Submission updated successfully'})

def delete_article(id):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM student_articles WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Submission deleted successfully'})

def serve_uploaded_file(filetype, filename):
    if filetype == "bonafide":
        return send_from_directory(BONAFIDE_FOLDER, filename)
    elif filetype == "essay":
        return send_from_directory(ESSAY_FOLDER, filename)
    return jsonify({'error': 'Invalid file type'}), 400

def admin_decision():
    data = request.get_json()
    article_id = data.get('id')
    decision = data.get('decision')
    email = data.get('email')

    if not all([article_id, decision, email]):
        return jsonify({'error': 'All fields required'}), 400

    if decision not in ['approved', 'rejected']:
        return jsonify({'error': 'Invalid decision'}), 400

    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("UPDATE student_articles SET status = %s WHERE id = %s", (decision, article_id))
    conn.commit()
    conn.close()

    if decision == 'rejected':
        # Send rejection email
        try:
            send_rejection_email(email)
        except Exception as e:
            return jsonify({'error': f'Failed to send email: {str(e)}'}), 500

    return jsonify({'message': f'Article {decision} successfully'})

def send_rejection_email(email):
    sender = "nagarajthangaraj872@gmail.com"
    password = "Nagu@1234"  # Use an app password for Gmail
    msg = EmailMessage()
    msg['Subject'] = 'Article Submission Status'
    msg['From'] = sender
    msg['To'] = email
    msg.set_content("We regret to inform you that your article was not selected. Thank you for your submission.")

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(sender, password)
        smtp.send_message(msg)


app.route('/view-bonafide/<filename>',methods=['GET','POST'])
def view_bonafide(filename):
    folder_path = os.path.join('backend','uploads', 'bonafide')
    return send_from_directory(folder_path, filename)

from werkzeug.utils import secure_filename

@app.route('/view-essay/<path:filename>', methods=['GET'])
def view_essay(filename):
    safe_filename = secure_filename(filename)
    folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'uploads', 'essay'))
    full_path = os.path.join(folder_path, safe_filename)
    print("🔍 File path:", full_path)

    if not os.path.exists(full_path):
        return jsonify({'error': 'File not found on server'}), 404

    return send_from_directory(folder_path, safe_filename, as_attachment=False)