from datetime import datetime

import pytz
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)

# format the timezone
date_now = datetime.utcnow().replace(
    tzinfo=pytz.utc).astimezone(
    pytz.timezone("Europe/Helsinki"))


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    reservations = db.relationship("Reservation", backref="person", lazy=True)

    def __repr__(self):
        return "<Person %r>" % self.id

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    genre = db.Column(db.String(64), nullable=False)
    players = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(128), nullable=False)
    reservations = db.relationship("Reservation", backref="game", lazy=True)

    def __repr__(self):
        return "<Game %r>" % self.id

    @property
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "genre": self.genre,
            "players": self.players,
            "description": self.description
        }


class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey("person.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)
    loan_date = db.Column(db.DateTime, default=date_now, nullable=False)
    end_date = db.Column(db.DateTime, default=date_now)

    def __repr__(self):
        return "<Reservation %r>" % self.username

    @property
    def serialize(self):
        return {
            "id": self.id,
            "person_id": self.person_id,
            "game_id": self.game_id,
            "start_date": self.loan_date,
            "end_date": self.end_date
        }


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
    app.run(debug=True)
