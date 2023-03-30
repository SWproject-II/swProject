import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function ReservationTable() {
  const [person, setPerson] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/detection")
      .then((response) => response.json())
      .then((data) => {
        setPerson(data.data.person);
        setReservations(data.data.reservations);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Person: {person.name} (ID: {person.id}, Age: {person.age})
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Game Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.game_name}</TableCell>
                <TableCell>{reservation.start_date}</TableCell>
                <TableCell>{reservation.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
