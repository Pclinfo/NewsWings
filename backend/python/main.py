

from flask import Flask, abort, request, jsonify, send_file, send_from_directory
import os
from user import *
from admin import *
from studentArticle import *

from werkzeug.utils import secure_filename ,safe_join
from flask_cors import CORS
import jwt as pyjwt
from jwt import ExpiredSignatureError, InvalidTokenError
from flask_jwt_extended import JWTManager
import fitz
# ========== Flask App Setup ==========
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["JWT_SECRET_KEY"] = "NewsWings"
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_COOKIE_SECURE"] = False  # For dev; True if HTTPS in prod
app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # Disable CSRF for simplicity here

jwt = JWTManager(app)




# Configs and folders
BASE_DIR = os.getcwd()

IMAGE_UPLOAD_FOLDER = os.path.join(BASE_DIR,'backend','static', 'uploads')
PDF_UPLOAD_FOLDER = os.path.join(BASE_DIR,'backend','uploads')
THUMBNAIL_FOLDER = os.path.join(BASE_DIR,'backend','thumbnails')

# Create folders if they don't exist
os.makedirs(IMAGE_UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PDF_UPLOAD_FOLDER, exist_ok=True)
os.makedirs(THUMBNAIL_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = IMAGE_UPLOAD_FOLDER

# ========== Routes ==========

@app.route('/', methods=['GET'])
def home():
    return "Flask App Connected Successfully"



@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    conn = connect_to_db()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    cur = conn.cursor()

    if 'pdf' not in request.files:
        return jsonify({'message': 'No file provided'}), 400

    file = request.files['pdf']
    category = request.form.get('category', '').lower()

    if not file or file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if category not in ['weekly', 'monthly', 'yearly']:
        return jsonify({'message': 'Missing or invalid category'}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({'message': 'Invalid file format'}), 400

    try:
        filename = secure_filename(file.filename)
        save_path = os.path.join(PDF_UPLOAD_FOLDER, filename)
        file.save(save_path)

        # Generate thumbnail
        doc = fitz.open(save_path)
        page = doc.load_page(0)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        thumb_name = f"{os.path.splitext(filename)[0]}.png"
        pix.save(os.path.join(THUMBNAIL_FOLDER, thumb_name))

        # Save to DB
        cur.execute("""
            INSERT INTO pdf_uploads (filename, category, upload_date)
            VALUES (%s, %s, %s)
            RETURNING id;
        """, (filename, category, datetime.utcnow()))
        pdf_id = cur.fetchone()[0]
        conn.commit()

        return jsonify({
            'message': 'PDF uploaded successfully',
            'pdf': {
                'id': pdf_id,
                'filename': filename,
                'category': category,
                'url': f'/uploads/{filename}',
                'thumbnail_url': f'/thumbnails/{thumb_name}'
            }
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Upload failed', 'details': str(e)}), 500
    finally:
        conn.close()

@app.route('/uploads/<filename>')
def serve_pdf(filename):
    return send_from_directory(PDF_UPLOAD_FOLDER, filename)

@app.route('/thumbnails/<filename>')
def serve_thumbnail(filename):
    return send_from_directory(THUMBNAIL_FOLDER, filename)

@app.route('/api/pdfs')
def api_pdfs():
    conn = connect_to_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM pdf_uploads ORDER BY upload_date DESC")
    pdfs = cur.fetchall()
    cur.close()

    for pdf in pdfs:
        thumb_name = os.path.splitext(pdf['filename'])[0] + '.png'
        if os.path.exists(os.path.join(THUMBNAIL_FOLDER, thumb_name)):
            pdf['thumbnail_url'] = f"/thumbnails/{thumb_name}"
        else:
            pdf['thumbnail_url'] = None
        pdf['url'] = f"/uploads/{pdf['filename']}"

    return jsonify(pdfs)

@app.route("/static/uploads/<path:filename>", methods=["GET"])
def get_image(filename):
    return send_from_directory(os.path.join(os.getcwd(), IMAGE_UPLOAD_FOLDER), filename)

def delete_pdf_route(pdf_id):
    return delete_pdf(pdf_id)

# ---------- User Routes ----------
@app.route("/newswings_register", methods=["POST"])
def register_user():
    return newswings_register()

@app.route("/newswings_login", methods=["POST"])
def login_user():
    return newswings_login()

@app.route("/newswings_logout", methods=["POST"])
def logout_user():
    return newswings_logout()

@app.route("/newswings_update_profile", methods=["PUT"])
@jwt_required()
def update_user():
    return update_profile()
@app.route('/admin_update_profile', methods=['PUT'])
def admin_update_profile_route():
    return  update_admin_profile()
@app.route('/user/me', methods=['GET'])
def fetch_current_user():
    token = request.cookies.get("access_token")
    if not token:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if not token:
        return jsonify({"error": "Token missing"}), 401

    try:
        decoded = pyjwt.decode(
            token,
            app.config["JWT_SECRET_KEY"],
            algorithms=["HS256"]
        )
        user_id = decoded.get("user_id")
        if not user_id:
            return jsonify({"error": "Invalid token payload"}), 401

        return get_current_user(user_id)

    except ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

# ---------- Admin CRUD Routes ----------
@app.route("/admin", methods=["POST"])
def create_admin_route():
    return create_admin()

@app.route("/admin", methods=["GET"])
def get_all_admin_route():
    return get_all_admins()

@app.route("/admin/<int:id>", methods=["PUT"])
def update_admin_route(id):
    return update_admin(id)

@app.route("/admin/<int:id>", methods=["DELETE"])
def delete_admin_route(id):
    return delete_admin(id)

@app.route('/admin/<int:news_id>', methods=['GET'])
def admin_get_news(news_id):
    return get_news_by_id(news_id)

@app.route("/admin_login", methods=["POST"])
def admin_login_route():
    return admin_login()

@app.route('/admin_profile/<int:id>',methods=['GET'])
def get_admin_profile(id):
    return admin_profile(id)
# ---------- PDF Upload & Serve ----------
@app.route('/upload_pdf', methods=["POST"])
def upload_pdf_route():
    return upload_pdf()

@app.route('/get_pdfs', methods=['GET'])
def get_pdf_route():
    return get_pdf()
@app.route('/delete_pdf/<int:pdf_id>', methods=['DELETE'])
def delete_pdf_route(pdf_id):
    return delete_pdf(pdf_id)
PDF_FOLDER = os.path.join(BASE_DIR,'backend','uploads')
@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    print(PDF_FOLDER + 'PDF')
    files = os.listdir(PDF_FOLDER)
    print("Files in uploads:", files)

    # Safely join the upload folder and filename
    safe_path = safe_join(PDF_FOLDER, filename)

    # Confirm file exists and return it
    if safe_path and os.path.isfile(safe_path):
        return send_from_directory(PDF_FOLDER, filename, as_attachment=True)
    else:
        abort(404)
# ---------- News Category & Posts ----------
@app.route('/get_categories', methods=['GET'])
def get_categories_route():
    return get_all_categories()

@app.route('/get_subcategories', methods=['GET'])
def get_subcategories_route():
    return get_all_subcategories()

@app.route('/subcategories_by_category', methods=['GET'])
def get_subcategories_by_category_route():
    category_name = request.args.get('category')
    return fetch_subcategories_by_category(category_name)

@app.route('/posts_by_category', methods=['GET'])
def get_posts_by_category_route():
    return get_posts_by_category()

@app.route('/get_posts_by_category_subcategory', methods=['GET'])
def get_posts_by_category_subcategory_route():
    return get_posts_by_category_subcategory()

# ---------- Student Article ----------
@app.route('/create-article', methods=['POST'])
def create_article_route():
    return create_article()
@app.route('/get-articles', methods=['GET'])
def get_articles_route():
    return get_all_articles()

@app.route('/get-article-by-id', methods=['GET'])
def get_article_by_id_route():
    article_id = request.args.get('id')
    return get_article_by_id(article_id)

@app.route('/update-article', methods=['PUT'])
def update_article_route():
    article_id = request.args.get('id')
    return update_article( article_id)

@app.route('/delete-article', methods=['DELETE'])
def delete_article_route():
    article_id = request.args.get('id')
    return delete_article(article_id)
@app.route('/admin/decision', methods=['POST'])
def decision_route():
    return admin_decision()

@app.route('/view-essay/<path:filename>', methods=['GET'])
def view_essay(filename):
    folder_path = os.path.join(os.getcwd(),'uploads','essay')
    return send_from_directory(folder_path, filename)

# ========== Run Server ==========
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")



