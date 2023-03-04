import main
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('mydatabase.db', check_same_thread=False)
cursor = conn.cursor()


@app.route('/api/detection', methods=['GET'])
def detection():
    # Call the main.py script
    names = ['Pauli', 'Alisa']

    # Loop over the names and query the database for each one
    data = []
    for name in names:
        cursor.execute("SELECT * FROM person WHERE name=?", (name,))
        results = cursor.fetchall()
        for result in results:
            data.append(result)

    # Return the recognition results as a JSON response
    return jsonify({'detection': data})


if __name__ == '__main__':
    app.run()