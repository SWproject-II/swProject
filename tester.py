from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

print("test first")
conn = sqlite3.connect('mydatabase.db', check_same_thread=False)

c = conn.cursor()




@app.route('/api/detection', methods=['GET'])
def detection():
    # Call the main.py script

    names = ['Pauli', 'Monopoly']

    # Retrieve person data
    c.execute("SELECT * FROM person WHERE name=?", (names[0],))
    person_data = c.fetchone()

    # Retrieve game data
    c.execute("SELECT * FROM game WHERE name=?", (names[1],))
    game_data = c.fetchone()

    #to empty reaervation table during testing
    c.execute("DELETE FROM reservation;")
    # Commit the changes
    conn.commit()

    # Insert reservation data
    c.execute(
        "INSERT INTO reservation (id, person_id, game_id, start_date, end_date) VALUES (?, ?, ?, '06032023', '07032023')",
        (1, person_data[0], game_data[0]))
    conn.commit()

    # Retrieve reservation data
    c.execute("SELECT * FROM reservation WHERE id=?", (1,))
    reservation_data = c.fetchone()

    print(reservation_data)


    # find data with queries
    # use person_id and game_id to create a new reservation query

    # query for person, save data to variable
    # query for reservations with person id, save data to variable

    # add person data and reservation data to api/detections
    # data = {'person': person_data, 'reservations': reservation_data}
    data = []
    if len(reservation_data) > 1:
        for unique_reservation_data in reservation_data:
            c.execute("SELECT * FROM reservation WHERE id=?", (1,))
            results = c.fetchall()
            for result in results:
                data.append(result)
    else:
        data.append(reservation_data)


    # Return the recognition results as a JSON response
    return jsonify({'detection': data})


if __name__ == '__main__':
    app.debug = True
    app.run(port=5001)