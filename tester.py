import main
from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
  host="localhost",
  user="tome",
  password="root",
  database="testi"
)

mycursor = db.cursor()

@app.route('/api/detection', methods=['GET'])
def detection():
    # Call the main.py script
    names = main.names

    # Loop over the names and query the database for each one
    data = []
    for name in names:
        mycursor.execute("SELECT * FROM person WHERE name=%s", (name,))
        result = mycursor.fetchone()
        if result:
            data.append(result)

    # Return the recognition results as a JSON response
    return jsonify({'detection': data})


    print("json")

if __name__ == '__main__':
    app.run()