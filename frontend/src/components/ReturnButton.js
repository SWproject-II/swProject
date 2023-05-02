import React from "react";
import { Button } from "@mui/material";

const ReserveButton = ({ personName, gameName }) => {
  const handleReturn = () => {
    fetch("http://localhost:5002/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person_name: personName,
        game_name: gameName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Game returned successfully");
        } else {
          alert("Error returning the game");
          console.log(personName, gameName);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button variant="contained" color="success" onClick={handleReturn}>
      Return
    </Button>
  );
};

export default ReserveButton;
