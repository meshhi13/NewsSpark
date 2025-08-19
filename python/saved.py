from database import conn
import json

c = conn.cursor()

def get_saved(email):
    c.execute('SELECT SAVED FROM accounts WHERE EMAIL = ?', (email,))
    row = c.fetchone()
    if row:
        return row[0]
    return None

def clear_article(email):
    c.execute('UPDATE accounts SET SAVED = ? WHERE EMAIL = ?', (json.dumps([]), email))
    conn.commit()
    return {"status": "success", "message": "Saved articles cleared"}

def send_saved_article(email, article):
    c.execute('SELECT SAVED FROM accounts WHERE EMAIL = ?', (email,))
    row = c.fetchone()
    
    if row:
        saved_articles = json.loads(row[0]) or []
        if article not in saved_articles:
            saved_articles.append(article)
            c.execute('UPDATE accounts SET SAVED = ? WHERE EMAIL = ?', (json.dumps(saved_articles), email))
            conn.commit()
            return {"status": "success", "message": "Article saved."}
        else:
            saved_articles.remove(article)
            c.execute('UPDATE accounts SET SAVED = ? WHERE EMAIL = ?', (json.dumps(saved_articles), email))
            return {"status": "succes", "message": "Article removed."}
    else:
        return {{"status": "error", "message": "Couldn't update saved articles"}}