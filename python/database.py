import sqlite3
from pathlib import Path

script_dir = Path(__file__).parent.absolute()
database_file = script_dir / "accounts.db"

conn = sqlite3.connect(database_file, check_same_thread=False)

c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS accounts (
        ID INTEGER PRIMARY KEY NOT NULL,
        NAME TEXT NOT NULL,
        EMAIL TEXT NOT NULL,
        PASSWORD TEXT NOT NULL
    )
''')

