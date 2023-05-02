import React, { useState } from "react";
import { Button } from "@mui/material";
import ReservationTable from "./ReservationTable";
import ReserveGame from "./ReserveGame";

const WelcomePage = (props) => {
  const [showReservations, setShowReservations] = useState(false);
  const [showReserveGame, setShowReserveGame] = useState(false);

  const handleReservationsClick = () => {
    const personName = Array.isArray(props.name) ? props.name[0] : props.name;
    console.log(personName);
    fetch(`http://127.0.0.1:5002/reservations/${personName}`)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("error");
      })
      .then((data) => {
        setShowReservations(true);
      })
      .catch((err) => console.error(err));
  };

  const handleReserveGameClick = () => {
    setShowReserveGame(true);
  };

  const handleBackClick = () => {
    setShowReservations(false);
  };

  const handleLogoutClick = () => {
    setShowReservations(false);
    props.onLogout();
  };

  return (
    <div>
      <h1>Tervetuloa {props.name} </h1>
      {showReservations ? (
        <ReservationTable personName={props.name} />
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={handleReservationsClick}
          >
            Own Reservations
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleReserveGameClick}
          >
            Reserve a game
          </Button>

          <Button variant="contained" color="success">
            Return a game
          </Button>
        </>
      )}
      {showReservations && (
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
      )}
      <Button variant="contained" color="warning" onClick={handleLogoutClick}>
        Log Out
      </Button>
      {showReserveGame && (
        <ReserveGame onClose={() => setShowReserveGame(false)} />
      )}
    </div>
  );
};

export default WelcomePage;
