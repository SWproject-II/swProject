import React from "react";
import { Button } from "@mui/material";

const ReserveButton = ({ personName, gameName }) => {
  const handleReserve = () => {
    fetch("http://localhost:5002/reserve", {
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
          alert("Game reserved successfully");
        } else {
          alert("Error reserving the game");
          console.log(personName, gameName);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button variant="contained" color="success" onClick={handleReserve}>
      Reserve
    </Button>
  );
};

export default ReserveButton;
