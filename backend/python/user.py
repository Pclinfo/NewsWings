from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required,get_jwt
from werkzeug.security import check_password_hash
from Database import connect_to_db
import jwt
import datetime
import bcrypt
import os
from werkzeug.utils import secure_filename
from flask import Blueprint
# Secret key to encode JWT
SECRET_KEY = "NewsWings"

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Initialize Flask app and CORS
app = Flask(__name__)


# Utility to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def newswings_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(f"Email: {email}, Password: {password}")

    if not all([email, password]):
        return jsonify({"error": "Missing required fields"}), 400

    conn = connect_to_db()
    cur = conn.cursor()

    try:
        cur.execute("SELECT * FROM newswings_register WHERE email = %s", (email,))
        user = cur.fetchone()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        stored_hashed = user[3]  # index 3 is 'password'

        # Validate password with bcrypt
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hashed.encode('utf-8')):
            return jsonify({'error': 'Invalid password'}), 401

        user_id=user[0]

        access_token = create_access_token( 
               identity=user_id,  # Will be stored in 'sub'
                expires_delta=datetime.timedelta(hours=1)
            )
           
        payload = {
            "sub": access_token, 
            'user_id': user[0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user[0],
                'email': user[4],  # index 4 is 'email'
                'name': user[1],  
                'profile_image':user[6] ,# index 1 is 'name'
                'mobile': user[5]  # index 5 is 'mobile'
            }
        }), 200

    except Exception as e:
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500
    finally:
        cur.close()
        conn.close()
        
def is_admin(user_id):
    try:
        user_id = int(user_id)  # Ensure user_id is integer
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("SELECT is_admin FROM admin_login WHERE id = %s", (user_id,))
        result = cur.fetchone()
        return result and result[0]
    except Exception as e:
        print("is_admin() error:", e)
        return False
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
def update_profile():
    jwt_data = get_jwt()
    user_id = jwt_data.get('user_id')
    print("Decoded User ID:", user_id)
    if not user_id:
        return jsonify({"error": "Invalid token or user not found"}), 401

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"error": "Invalid user ID format"}), 400

    name = request.form.get("name")
    email = request.form.get("email")
    mobile = request.form.get("mobile")
    profile_image = request.files.get("profile_image")
    remove_image = request.form.get("remove_image") == "true"

    image_path = ""
    conn = None
    cur = None

    if not name:
        return jsonify({"error": "Name is required"}), 400

    try:
        conn = connect_to_db()
        cur = conn.cursor()

        # Fetch existing image path
        cur.execute("SELECT profile_image FROM newswings_register WHERE id = %s", (user_id,))
        current_image = cur.fetchone()
        current_image_path = current_image[0] if current_image else None

        # Remove image if requested
        if remove_image and current_image_path:
            try:
                file_path = os.path.join(os.getcwd(), current_image_path.lstrip("/"))
                if os.path.exists(file_path):
                    os.remove(file_path)
                    print("Deleted image file:", file_path)
            except Exception as e:
                print("Failed to delete image:", e)
            cur.execute("""
                UPDATE newswings_register
                SET profile_image = NULL
                WHERE id = %s
            """, (user_id,))
            image_path = None  # for return payload

        # Upload new image if provided
        if profile_image and allowed_file(profile_image.filename):
            filename = secure_filename(profile_image.filename)
            upload_folder = os.path.join("static", "uploads", "profile_images")
            os.makedirs(upload_folder, exist_ok=True)
            full_path = os.path.join(upload_folder, filename)
            profile_image.save(full_path)
            image_path = "/" + os.path.relpath(full_path, start=os.getcwd()).replace("\\", "/")

            cur.execute("""
                UPDATE newswings_register
                SET name = %s, email = %s, mobile = %s, profile_image = %s
                WHERE id = %s
            """, (name, email, mobile, image_path, user_id))

        else:
            # Only update other fields if no new image
            cur.execute("""
                UPDATE newswings_register
                SET name = %s, email = %s, mobile = %s
                WHERE id = %s
            """, (name, email, mobile, user_id))

        conn.commit()
        return jsonify({
            "message": "Profile updated successfully",
            "user": {
                "name": name,
                "email": email,
                "mobile": mobile,
                "profile_image": image_path or current_image_path  # fallback if no change
            }
        }), 200

    except Exception as e:
        print("Profile update error:", e)
        return jsonify({"error": "Profile update failed", "message": str(e)}), 500

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
def newswings_register():
    conn = connect_to_db()
    if not conn:
        return jsonify({"error": "Unable to connect to database"}), 500

    cur = conn.cursor()

    # Optional profile image
    file = request.files.get('profile_image')
    filename = ""  # default image filename or empty string if you'd prefer ""

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file.save(filepath)
    elif file:
        return jsonify({"error": "Invalid file type (only JPG, PNG allowed)"}), 400

    name = request.form.get('name')
    dob = request.form.get('dob')
    email = request.form.get('email')
    password = request.form.get('password')
    mobile = request.form.get('mobile')

    if not all([name, dob, email, password, mobile]):
        return jsonify({"error": "Missing fields"}), 400

    try:
        cur.execute("SELECT 1 FROM newswings_register WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({"error": "Email already registered"}), 409

        # Hash password securely
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        cur.execute("""
            INSERT INTO newswings_register (name, dob, password, email, mobile, profile_image)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, dob, hashed_password, email, mobile, filename))

        conn.commit()
        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        conn.rollback()
        print(f"Insert error: {e}")
        return jsonify({"error": "Database error", "message": str(e)}), 500
    finally:
        conn.close()

def newswings_logout():
    """
    Logs the user out by deleting the access token cookie.
    """
    response = make_response(jsonify({"message": "Logout successful"}))
    # Delete the JWT token cookie by matching the parameters when it was set
    # response.delete_cookie("access_token", path="/", samesite="Lax", secure=True)
    
    return response
user_bp = Blueprint('user_bp', __name__)

# Updated get_current_user function



def get_current_user(user_id):
    if not user_id:
        return jsonify({"error": "Invalid user ID"}), 400

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, email, mobile, profile_image FROM newswings_register WHERE id = %s",
            (user_id,)
        )
        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            return jsonify({
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "mobile": user[3],
                "profile_image": user[4]
            }), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        import traceback
        traceback.print_exc()  # Print error to terminal/log for debugging
        return jsonify({"error": "Error fetching user", "details": str(e)}), 500