from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import datetime

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('mydatabase.db', check_same_thread=False)
c = conn.cursor()


@app.route('/api/detection', methods=['GET'])
def detection():

    names = ['Pauli', "Monopoly"]

    # Retrieve person data
    c.execute("SELECT * FROM person WHERE name=?", (names[0],))
    person_data = c.fetchone()

    # Retrieve game data
    c.execute("SELECT * FROM game WHERE name=?", (names[1],))
    game_data = c.fetchone()

    # Calculate start and end dates
    start_date = datetime.datetime.now().strftime('%d%m%Y')
    end_date = (datetime.datetime.now() + datetime.timedelta(days=14)).strftime('%d%m%Y')

    # Check if there is an ongoing reservation for the same person and game
    c.execute("SELECT * FROM reservation WHERE person_id=? AND game_id=? AND is_ongoing=1", (person_data[0], game_data[0]))
    ongoing_reservation = c.fetchone()

    if ongoing_reservation:
        # If there is an ongoing reservation, update its is_ongoing column to False
        c.execute("UPDATE reservation SET is_ongoing=0 WHERE id=?", (ongoing_reservation[0],))
    else:
        # If there isn't an ongoing reservation, insert a new reservation
        c.execute(
            "INSERT INTO reservation (person_id, game_id, start_date, end_date, is_ongoing) VALUES (?, ?, ?, ?, ?)",
            (person_data[0], game_data[0], start_date, end_date, 1))

    conn.commit()

    # Retrieve reservation data with game names
    c.execute(
        "SELECT reservation.id, person_id, game.name, start_date, end_date FROM reservation JOIN game ON reservation.game_id = game.id WHERE reservation.person_id=?", (person_data[0],))
    reservation_data = c.fetchall()

    print(reservation_data)

    # Create a list to store the reservation data and person data
    reservations = []
    for row in reservation_data:
        reservation = {
            'id': row[0],
            'person_id': row[1],
            'game_name': row[2],
            'start_date': row[3],
            'end_date': row[4]
        }

        reservations.append(reservation)

    person = {
        'id': person_data[0],
        'name': person_data[1],
        'age': person_data[2],
    }

    data = {
        'reservations': reservations,
        'person': person,
    }

    # Return the reservation data as a JSON response
    return jsonify({'data': data})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
