import React, { useState, useEffect } from "react";
import { API_getDetection } from "../Constants";

export default function Face() {
  //const [detection, setDetection] = useState("");
  const [name, setName] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(API_getDetection)
      .then((response) => response.json())
      .then(data => {
        setName(data.data.person.name);
        setReservations(data.data.reservations);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {" "}
      <h3>{name}'s Reservations:</h3>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            Game id: {reservation.game_id}, Start date: {reservation.start_date}, End date: {reservation.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
}