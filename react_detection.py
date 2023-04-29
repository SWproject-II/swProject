import io
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import yolov5
from classes import Reservation, Person, Game, db

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)

# load pretrained model
face_model = yolov5.load('face2.2.pt')
game_model = yolov5.load('games2.2.pt')


@app.route('/auth', methods=['POST'])
def auth():
    # convert the request data to an image
    file = request.files['image']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # perform inference
    results = face_model(img)

    # parse results
    pred = results.pandas().xyxy[0]
    names = []
    for index, row in pred.iterrows():
        names.append(row['name'])

    # log the predicted names
    print(names)

    global face_detected
    face_detected = names[0]

    # log detected face
    print(face_detected)

    results.show()

    # return the predicted bounding boxes as JSON
    return {'names': names}


# get reservations for authenticated person
@app.route('/reservations/<person_name>', methods=['POST', 'GET'])
def person_reservations():
    # query the database to get the Person object with the given name
    person = Person.query.filter_by(name=person_name).first()

    # check if the person exists in the database
    if person is None:
        return {'error': 'Person not found'}, 404

    # get the person's ongoing reservations
    ongoing_reservations = [r for r in person.reservations if r.end_date is None]

    # return the ongoing reservations as a JSON object
    return {'reservations': [{'game': r.game.name, 'loan_date': r.loan_date.isoformat()} for r in ongoing_reservations]}


# make a new reservation
@app.route('/reservations/<person_name>/<game_name>', methods=['POST'])
def make_reservation(person_name, game_name):
    # query the database to get the Person and Game objects
    person = Person.query.filter_by(name=person_name).first()
    game = Game.query.filter_by(name=game_name).first()

    # check if the person and game exist in the database
    if person is None or game is None:
        return {'error': 'Person or game not found'}, 404

    # check if the game is already reserved
    if any(r.end_date is None and r.game == game for r in game.reservations):
        return {'error': 'Game already reserved'}, 400

    # create a new reservation and add it to the Person and Game objects
    reservation = Reservation(person=person, game=game)
    db.session.add(reservation)
    db.session.commit()

    # return a success response
    return {'message': 'Reservation made successfully'}


# API routes
@app.route("/api/persons")
def get_persons():
    persons = Person.query.all()
    return jsonify([person.serialize for person in persons])


@app.route("/api/games")
def get_games():
    games = Game.query.all()
    return jsonify([game.serialize for game in games])


@app.route("/api/reservations")
def get_reservations():
    reservations = Reservation.query.all()
    return jsonify([reservation.serialize for reservation in reservations])


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5002)
