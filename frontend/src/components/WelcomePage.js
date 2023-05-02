import React, { useState } from "react";
import { Button } from "@mui/material";
import ReservationTable from "./ReservationTable";

const WelcomePage = (props) => {
  const [showReservations, setShowReservations] = useState(false);

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
  const handleBackClick = () => {
    setShowReservations(false);
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
          <Button variant="contained" color="success">
            Loan
          </Button>
          <Button variant="contained" color="success">
            Return
          </Button>
        </>
      )}
      {showReservations && (
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
      )}
    </div>
  );
};

export default WelcomePage;
