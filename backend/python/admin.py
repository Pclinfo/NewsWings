import os
import uuid
import bcrypt
import jwt
from functools import wraps
from flask import Flask, app, request, jsonify , current_app
from werkzeug.utils import secure_filename
from Database import connect_to_db
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, jwt_required, get_jwt_identity
SECRET_KEY = "NewsWings"
UPLOAD_FOLDER = 'static/uploads/home'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


# Helpers
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def require_jwt(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401
        token = auth_header.split(" ")[1]
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated_function

# Create Admin

def create_admin():
    title = request.form.get('news_title')
    description = request.form.get('news_description')
    category = request.form.get('news_category')          # This should be category name like "Sports", not a file path
    sub_category = request.form.get('news_sub_category')
    image = request.files.get('image')
    width = request.form.get('image_width')
    height = request.form.get('image_height')

    # Validate required fields
    if not all([title, description, category, sub_category]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Validate width and height are integers if provided
    try:
        width = int(width) if width else None
        height = int(height) if height else None
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid width or height'}), 400

    image_url = None

    if image:
        filename = secure_filename(image.filename)
        if '.' not in filename or filename.rsplit('.', 1)[1].lower() not in {'png', 'jpg', 'jpeg'}:
            return jsonify({'error': 'Unsupported image extension'}), 400

        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
        os.makedirs(upload_folder, exist_ok=True)

        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        image_path = os.path.join(upload_folder, unique_filename)
        image.save(image_path)

        # Store relative path for serving static files, consistent with your frontend expectation
        image_url = f'static/uploads/{unique_filename}'

    # Insert into database with correct column names
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO admin 
            (news_title, news_description, news_category, news_sub_category, image_url, image_width, image_height)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """, (title, description, category, sub_category, image_url, width, height))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        return jsonify({'error': f'Database error: {str(e)}'}), 500

    return jsonify({
        'message': 'News created successfully',
        'data': {
            'news_title': title,
            'news_description': description,
            'news_category': category,
            'news_sub_category': sub_category,
            'image_url': image_url,
            'image_width': width,
            'image_height': height
        }
    }), 201

def get_all_admins():
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT 
                id, 
                news_title, 
                news_description, 
                news_category, 
                news_sub_category, 
                image_url, 
                image_width, 
                image_height
            FROM admin
            ORDER BY id DESC;
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Adjust image_url to add leading slash if needed
        for row in rows:
            if row['image_url']:
                row['image_url'] = f"/{row['image_url']}" if not row['image_url'].startswith('/') else row['image_url']

        return jsonify(rows), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
        #getAllCategories
def get_all_categories():
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor()
        cur.execute("SELECT DISTINCT news_category FROM admin ORDER BY news_category;")
        categories = [row[0] for row in cur.fetchall()]
        cur.close()
        conn.close()

        return jsonify(categories), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
#getAllSubCategories
def get_all_subcategories():
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor()
        cur.execute("SELECT DISTINCT news_sub_category FROM admin ORDER BY news_sub_category;")
        subcategories = [row[0] for row in cur.fetchall()]
        cur.close()
        conn.close()

        return jsonify(subcategories), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    

def fetch_subcategories_by_category(category):
    if not category:
        return jsonify({"error": "Category parameter is required"}), 400

    try:
        print("Requested category:", category)

        conn = connect_to_db()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT DISTINCT news_sub_category 
                    FROM admin 
                    WHERE news_category = %s 
                    ORDER BY news_sub_category;
                    """,
                    (category,)
                )
                rows = cur.fetchall()
                print("Fetched rows:", rows)

                subcategories = [row[0] for row in rows]

        return jsonify(subcategories), 200

    except Exception as e:
        import traceback
        print("ERROR:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    #GetPostsByCategoryPosts
def get_posts_by_category():
    category = request.args.get('category')
    if not category:
        return jsonify({"error": "Category parameter is required"}), 400
    
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT 
                id, 
                news_title, 
                news_description, 
                news_category, 
                news_sub_category, 
                image_url, 
                image_width, 
                image_height
            FROM admin
            WHERE news_category = %s
            ORDER BY id DESC;
        """, (category,))
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Fix image_url to add leading slash if missing
        for row in rows:
            if row['image_url']:
                row['image_url'] = f"/{row['image_url']}" if not row['image_url'].startswith('/') else row['image_url']

        return jsonify(rows), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
    #getPostsByCategoryWithSubCategories  
def get_posts_by_category_subcategory():
    category = request.args.get('category')
    sub_category = request.args.get('sub_category')

    if not category or not sub_category:
        return jsonify({"error": "Both category and sub_category parameters are required"}), 400
    
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            SELECT 
                id, 
                news_title, 
                news_description, 
                news_category, 
                news_sub_category, 
                image_url, 
                image_width, 
                image_height
            FROM admin
            WHERE news_category = %s AND news_sub_category = %s
            ORDER BY id DESC;
        """, (category, sub_category))
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Fix image_url to add leading slash if missing
        for row in rows:
            if row['image_url']:
                row['image_url'] = f"/{row['image_url']}" if not row['image_url'].startswith('/') else row['image_url']

        return jsonify(rows), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Update Admin
# @require_jwt
def update_admin(id):
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    cur = conn.cursor()

    news_title = request.form.get('news_title')
    news_description = request.form.get('news_description')
    news_category = request.form.get('news_category')
    news_sub_category = request.form.get('news_sub_category')
    width = request.form.get('image_width')
    height = request.form.get('image_height')

    if not all([news_title, news_description, news_category, news_sub_category]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        width = int(width) if width else None
        height = int(height) if height else None
    except ValueError:
        return jsonify({"error": "Width and height must be numbers"}), 400

    db_filename = None
    if 'image' in request.files:
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4().hex}_{filename}"
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
            os.makedirs(upload_folder, exist_ok=True)
            file_path = os.path.join(upload_folder, unique_filename)
            file.save(file_path)
            db_filename = f"static/uploads/{unique_filename}"
        else:
            return jsonify({"error": "Unsupported or missing image file"}), 400

    try:
        if db_filename:
            cur.execute("""
                UPDATE admin 
                SET news_title=%s, news_description=%s, news_category=%s, 
                    news_sub_category=%s, image_url=%s, image_width=%s, image_height=%s
                WHERE id=%s
            """, (news_title, news_description, news_category, news_sub_category, db_filename, width, height, id))
        else:
            cur.execute("""
                UPDATE admin 
                SET news_title=%s, news_description=%s, news_category=%s, 
                    news_sub_category=%s, image_width=%s, image_height=%s
                WHERE id=%s
            """, (news_title, news_description, news_category, news_sub_category, width, height, id))

        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Update failed", "details": str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "Admin post updated"}), 200

@require_jwt
def delete_admin(id):
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM admin WHERE id = %s", (id,))
        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Delete failed", "details": str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "Admin deleted"}), 200

def get_news_by_id(news_id):
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    cur = conn.cursor()

    try:
        cur.execute("""
            SELECT id, news_title, news_description, news_category, 
                   news_sub_category, image_url, image_width, image_height
            FROM admin WHERE id = %s
        """, (news_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "News not found"}), 404

        news = {
            "id": row[0],
            "news_title": row[1],
            "news_description": row[2],
            "news_category": row[3],
            "news_sub_category": row[4],
            "image_url": f"/{row[5]}" if row[5] else None,
            "image_width": row[6],
            "image_height": row[7]
        }

        return jsonify(news), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch news", "details": str(e)}), 500
    finally:
        conn.close()

def admin_login():
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        if request.is_json:
            data = request.get_json()
          
            if not data:
                return jsonify({"error": "Empty JSON body"}), 400
            email = data.get('email')
            password = data.get('password')
        else:
            email = request.form.get('email')
            password = request.form.get('password')

        if not all([email, password]):
            return jsonify({"error": "Missing required fields"}), 400

        cur.execute("SELECT id,email,name ,profile_image FROM admin_login WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()

        if user:
            user_id = str(user["id"]) 
            print(user_id)
            # # Set token expiration (e.g., 1 hour from now)
            expiration_time = datetime.utcnow() + timedelta(hours=1)
            print(expiration_time)
            access_token = create_access_token(
                identity= user_id , # Will be stored in 'sub'
                expires_delta=timedelta(hours=1)
            )
            print(access_token)

            payload = {
                "sub": access_token, 
                "user_id":user_id,
                "exp":expiration_time
            }

            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

            return jsonify({
                "message": "Login successful",
                "user": user,
                "token": token
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": "Login failed", "details": str(e)}), 500
    finally:
        conn.close()

@jwt_required()
def update_admin_profile():
    jwt_data = get_jwt()
    user_id = jwt_data.get('user_id')

    if not user_id:
        return jsonify({"error": "Invalid token or user not found"}), 401

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID format"}), 400

    name = request.form.get("name")
    email = request.form.get("email")
    profile_image = request.files.get("profile_image")
    remove_image = request.form.get("remove_image") == "true"

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    conn = cur = None
    image_path = None

    try:
        conn = connect_to_db()
        cur = conn.cursor()

        # Fetch existing image path before any changes
        cur.execute("SELECT profile_image FROM admin_login WHERE id = %s", (user_id,))
        result = cur.fetchone()
        old_image_path = result[0] if result else None

        # Handle image removal
        if remove_image and old_image_path:
            try:
                file_path = os.path.join("backend", old_image_path)
                if os.path.exists(file_path):
                    os.remove(file_path)
                image_path = None  # Removed
                cur.execute("""
                    UPDATE admin_login
                    SET name = %s, email = %s, profile_image = NULL
                    WHERE id = %s
                """, (name, email, user_id))
            except Exception as e:
                print(f"Failed to delete image: {e}")
                # Continue without stopping
        elif profile_image and allowed_file(profile_image.filename):
            filename = secure_filename(profile_image.filename)
            upload_folder = os.path.join("backend", "static", "uploads", "profile_images")
            os.makedirs(upload_folder, exist_ok=True)
            full_path = os.path.join(upload_folder, filename)
            profile_image.save(full_path)
            image_path = os.path.join("static", "uploads", "profile_images", filename)

            cur.execute("""
                UPDATE admin_login
                SET name = %s, email = %s, profile_image = %s
                WHERE id = %s
            """, (name, email, image_path, user_id))
        else:
            # No new image or removal; just update name and email
            cur.execute("""
                UPDATE admin_login
                SET name = %s, email = %s
                WHERE id = %s
            """, (name, email, user_id))

            image_path = old_image_path  # retain old image

        conn.commit()
        return jsonify({
            "message": "Admin profile updated successfully",
            "user": {
                "name": name,
                "email": email,
                "profile_image": image_path
            }
        }), 200

    except Exception as e:
        print("Admin profile update error:", e)
        return jsonify({"error": "Admin profile update failed", "message": str(e)}), 500

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
def admin_profile(id):
    user_id=id
    conn=connect_to_db()
    cur=conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("select id,email,Name,profile_image from admin_login where id=%s",(user_id,))
    row=cur.fetchone()

    if row and row.get("profile_image"):
        # Convert backslashes to forward slashes
        row["profile_image"] = row["profile_image"].replace("\\", "/")
    return jsonify(row)

def delete_pdf(pdf_id):
    conn = connect_to_db()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500
    cur = conn.cursor()

    try:
        # Get filename from DB
        cur.execute("SELECT filename FROM pdf_uploads WHERE id = %s", (pdf_id,))
        row = cur.fetchone()

        if not row:
            return jsonify({'error': 'PDF not found'}), 404

        filename = row[0]
        file_path = os.path.join('uploads', filename)

        # Delete from DB
        cur.execute("DELETE FROM pdf_uploads WHERE id = %s", (pdf_id,))
        conn.commit()

        # Delete file from disk
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({'message': 'PDF deleted successfully'}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Delete failed', 'details': str(e)}), 500

    finally:
        conn.close()
def get_pdf():
    conn = connect_to_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM pdf_uploads ORDER BY upload_date DESC")
    pdfs = cur.fetchall()
    cur.close()
    return jsonify(pdfs)