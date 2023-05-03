import React, { useState } from "react";
import { Button } from "@mui/material";
import ReservationTable from "./ReservationTable";
import ReserveGame from "./ReserveGame";
import GameReturning from "./GameReturning";

const WelcomePage = (props) => {
  const [showReservations, setShowReservations] = useState(false);
  const [showReserveGame, setShowReserveGame] = useState(false);
  const [showReturnGame, setShowReturnGame] = useState(false);

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
        setShowReturnGame(false);
        setShowReserveGame(false);
      })
      .catch((err) => console.error(err));
  };

  const handleReserveGameClick = () => {
    setShowReserveGame(true);
    setShowReturnGame(false);
    setShowReservations(false);
  };

  const handleReturnGameClick = () => {
    setShowReturnGame(true);
    setShowReserveGame(false);
    setShowReservations(false);
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
      <h1>Welcome {props.name} </h1>
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

          <Button
            variant="contained"
            color="success"
            onClick={handleReturnGameClick}
          >
            Return a game
          </Button>
        </>
      )}
      {showReturnGame && (
        <GameReturning
          personName={props.name}
          onClose={() => setShowReturnGame(false)}
        />
      )}
      {showReservations && (
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
      )}

      {showReserveGame && (
        <ReserveGame
          personName={props.name}
          onClose={() => setShowReserveGame(false)}
        />
      )}
    </div>
  );
};

export default WelcomePage;
