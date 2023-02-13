import main
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/detection', methods=['GET'])
def detection():
    # Call the main.py script
    names = main.names
    print(names)

    # Return the recognition results as a JSON response

    return jsonify({'detection': names})



    print("json")

if __name__ == '__main__':
    app.run()