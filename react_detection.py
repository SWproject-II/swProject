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


""" TODO !!!
@app.route('/reservations', methods=['POST', 'GET'])
def reservations():
    person_id = Person.query.filter_by(name=face_detected).first()
    ongoing_reservations = Reservation.query.filter_by(person_id=person_id.id).all()

    print(ongoing_reservations)
    return ongoing_reservations
"""


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
