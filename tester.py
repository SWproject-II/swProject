from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('mydatabase.db', check_same_thread=False)
c = conn.cursor()

@app.route('/api/detection', methods=['GET'])
def detection():
    # Call the main.py script

    names = ['Pauli', 'Monopoly', 'Alias']
    # Retrieve person data
    c.execute("SELECT * FROM person WHERE name=?", (names[0],))
    person_data = c.fetchone()

    # Retrieve game data
    c.execute("SELECT * FROM game WHERE name=?", (names[1],))
    game_data = c.fetchone()


    # Retrieve game data
    c.execute("SELECT * FROM game WHERE name=?", (names[2],))
    game_data2 = c.fetchone()

    # Delete all rows in the reservation table
    c.execute("DELETE FROM reservation;")
    conn.commit()

    # Insert reservation data
    c.execute("INSERT INTO reservation (id, person_id, game_id, start_date, end_date) VALUES (?, ?, ?, '06032023', '07032023')",
              (1, person_data[0], game_data[0]))
    c.execute("INSERT INTO reservation (id, person_id, game_id, start_date, end_date) VALUES (?, ?, ?, '06032023', '07032023')",
              (2, person_data[0], game_data2[0]))
    conn.commit()

    c.execute("SELECT * FROM reservation")
    reservation_data = c.fetchall()

    print(reservation_data)


    # Create a list to store the reservation data
    data = []
    for row in reservation_data:
        # Create a dictionary to store the reservation data labeled by their names
        reservation = {
            'id': row[0],
            'person_id': row[1],
            'game_id': row[2],
            'start_date': row[3],
            'end_date': row[4]
        }

        # 



        # Append the reservation data to the list
        data.append(reservation)
        data.append(person)

    # Return the reservation data as a JSON response
    return jsonify({'reservations': data})

if __name__ == '__main__':
    app.run(debug=True, port=5001)