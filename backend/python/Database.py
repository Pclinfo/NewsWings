import psycopg2

# PostgreSQL database config
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "ven"
DB_HOST = "localhost"
DB_PORT = "5432"

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
        )
        return conn
    except psycopg2.OperationalError as e:
        print(f"Database connection error: {e}")
        return None

def create_tables():
    conn = connect_to_db()
    if conn:
        cur = conn.cursor()

        # Table: newswings_register
        cur.execute("""
            CREATE TABLE IF NOT EXISTS newswings_register (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                dob DATE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                profile_image VARCHAR(255) NOT NULL
            );
        """)

        # Table: admin
        cur.execute("""
            CREATE TABLE IF NOT EXISTS admin (
              id SERIAL PRIMARY KEY,
              news_title TEXT NOT NULL,
              news_description TEXT NOT NULL,
              news_category TEXT NOT NULL,
              news_sub_category TEXT,  -- This line is required
              image_url TEXT,
              image_width INTEGER,
              image_height INTEGER
            );
        """)

        # Table: Admin_login
        cur.execute("""
            CREATE TABLE IF NOT EXISTS Admin_login (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        """)

        # Table: pdf_uploads
        cur.execute("""
            CREATE TABLE IF NOT EXISTS pdf_uploads (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                category VARCHAR(50) NOT NULL,
                upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        cur.execute("""CREATE TABLE IF NOT EXISTS student_articles(
            id SERIAL PRIMARY KEY,
            article_type TEXT NOT NULL,
            username TEXT NOT NULL,
            mobile_number TEXT NOT NULL,
            bonafide_file TEXT NOT NULL,
            essay_file TEXT NOT NULL ,
            email TEXT NOT NULL)""")
        conn.commit()
        conn.close()
        print("Tables created successfully.")
    else:
        print("Failed to connect to the database.")

# Run table creation
create_tables()
