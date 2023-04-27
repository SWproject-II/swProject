import React from "react";
import { Button } from "@mui/material";
import { useRef, useState } from "react";


const WelcomePage = (props) => {



    return (
        <div>
            <h1>Tervetuloa {props.name} </h1>
            <Button variant="contained" color="success" > Loan
            </Button>
            <Button variant="contained" color="success"> Return
            </Button>
            <Button variant="contained" color="success" > Own Reservations
            </Button>
        </div>
    )

}

export default WelcomePage


