from database import conn
from enum import Enum

c = conn.cursor()
enum = []

# 0 - VALID
# 1 - WRONG PASSWORD
# 2 - ACCOUNT DOES NOT EXIST
# 3 - ACCOUNT ALREADY EXISTS

def sign_in(email, password):
    c.execute('SELECT NAME, EMAIL, PASSWORD FROM accounts WHERE EMAIL =?', (email,))
    conn.commit()
    row = c.fetchone()
    if row:
        if password == row[2]:
            return 0
        else:
            return 1
    else:
        return 2


def sign_up(name, email, password):
    c.execute('SELECT NAME, EMAIL, PASSWORD FROM accounts WHERE EMAIL =?', (email,))
    row = c.fetchone()
    if row:
        return 3
    else:
        c.execute(f"INSERT INTO accounts (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)", (name, email, password))
        return 0
    


