import sqlite3
from flask import Flask

app = Flask(__name__)
conn = sqlite3.connect('mydatabase.db')

c = conn.cursor()
c.execute("SELECT * FROM person WHERE name=?", ('Pauli',))
row = c.fetchone()

if row:
    print(row)
else:
    print("No person found with ID 'P'")

conn.close()
