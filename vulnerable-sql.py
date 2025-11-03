import sqlite3

def get_user(username):
    # Insecure SQL query that could lead to SQL injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    
    cursor.execute(query)
    return cursor.fetchall()

# Example usage
username_input = "' OR '1'='1"
print(get_user(username_input))