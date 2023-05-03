import io

import yolov5
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

from classes import Game, Person, Reservation, date_now, db

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)

# load pretrained model
face_model = yolov5.load("face2.2.pt")
game_model = yolov5.load("games2.2.pt")


@app.route("/auth", methods=["POST"])
def auth():
    # convert the request data to an image
    file = request.files["image"]
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # perform inference
    result = face_model(img)

    # parse results
    pred = result.pandas().xyxy[0]

    # filter out duplicate detections and keep only the one with the highest
    # confidence
    pred = pred.drop_duplicates(subset=["name"], keep="first")

    # get the predicted name and confidence
    name = pred.iloc[0]["name"]
    confidence = pred.iloc[0]["confidence"]

    # log the predicted name and confidence
    print(f"Name: {name}, Confidence: {confidence}")

    # return the predicted name as JSON
    return {"names": [name]}


@app.route("/game_auth", methods=["POST"])
def game_auth():
    # convert the request data to an image
    file = request.files["image"]
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # perform inference
    result = game_model(img)

    # parse results
    pred = result.pandas().xyxy[0]
    pred = pred.drop_duplicates(subset=["name"], keep="first")

    # print the prediction output
    print(pred)

    game = []
    for index, row in pred.iterrows():
        game.append(row["name"])

    # log the predicted game
    print(game)

    # return the predicted bounding boxes as JSON
    return {"game": game}


# get reservations for authenticated person
@app.route("/reservations/<string:person_name>", methods=["GET"])
def person_reservations(person_name):
    # query the database to get the Person object with the given name
    person = Person.query.filter_by(name=person_name).first()

    # check if the person exists in the database
    if person is None:
        return {"error": "Person not found"}, 404

    # get the person's ongoing reservations
    reservations = [r for r in person.reservations]

    # return the ongoing reservations as a JSON object
    return {
        "reservations": [{"game": r.game.name, "loan_date": r.loan_date, "end_date": r.end_date} for r in reservations]}


@app.route("/reserve", methods=["POST"])
def reserve():
    # parse the reservation data from the request body
    data = request.get_json()
    person_name = data.get("person_name")
    game_name = data.get("game_name")
    print(person_name[0])
    print(game_name[0])

    # retrieve the person and game objects from the database
    person = Person.query.filter_by(name=person_name[0]).first()
    game = Game.query.filter_by(name=game_name[0]).first()

    if not person:
        return jsonify({"error": "Person not found"}), 404

    if not game:
        return jsonify({"error": "Game not found"}), 404

    # create a new reservation object and save it to the database
    reservation = Reservation(person_id=person.id, game_id=game.id)
    db.session.add(reservation)
    db.session.commit()

    return jsonify({"success": True}), 200


# return a game
@app.route("/return", methods=["POST"])
def return_game():
    # get person and game data from the request
    data = request.get_json()
    person_name = data.get("person_name")
    game_name = data.get("game_name")
    print(person_name[0])
    print(game_name[0])

    # find the person in the database
    person = Person.query.filter_by(name=person_name[0]).first()

    if not person:
        return {"error": f"Person {person_name} not found in the database"}

    # find the game in the database
    game = Game.query.filter_by(name=game_name[0]).first()

    if not game:
        return {"error": f"Game {game_name} not found in the database"}

    # find the ongoing reservation for this person and game
    reservation = Reservation.query.filter_by(
        person_id=person.id, game_id=game.id, end_date=None).first()

    if not reservation:
        return {
            "error": f"No ongoing reservation found for {person_name} and {game_name}"}

    # update the end date of the reservation to the current time
    reservation.end_date = date_now

    # commit changes to the database
    db.session.commit()

    return {"success": f"{person_name} has returned {game_name}"}


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

if __name__ == "__main__":
    app.run(debug=True, port=5002)
