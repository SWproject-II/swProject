from datetime import datetime

import pytz
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
            "name": self.name,
            "reservations": [
                {
                    "game_name": reservation.game.name,
                    "loan_date": reservation.loan_date,
                    "end_date": reservation.end_date
                } for reservation in self.reservations
            ]
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
            "description": self.description,
            "reservations": [
                {
                    "person_name": reservation.person.name,
                    "loan_date": reservation.loan_date,
                    "end_date": reservation.end_date
                } for reservation in self.reservations
            ]
        }


class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey("person.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)
    loan_date = db.Column(db.DateTime, default=date_now, nullable=False)
    end_date = db.Column(db.DateTime)

    def __repr__(self):
        return "<Reservation %r>" % self.username

    @property
    def serialize(self):
        return {
            "id": self.id,
            "start_date": self.loan_date,
            "end_date": self.end_date,
            "person_name": self.person.name,
            "game_name": self.game.name
        }
