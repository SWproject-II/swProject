import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const ReservationTable = (props) => {
  const [reservations, setReservations] = useState([]);

  const columns = [
    {
      name: "Game Name",
      selector: (row) => row.game,
      sortable: true,
      center: true,
      reorder: true,
      style: { background: "lightblue", fontWeight: "bold" },
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.loan_date).toLocaleDateString(),
      sortable: true,
      center: true,
      reorder: true,
      style: { fontWeight: "bold" },
    },
    {
      name: "End Date",
      selector: (row) =>
        row.end_date ? new Date(row.end_date).toLocaleDateString() : "",
      sortable: true,
      center: true,
      reorder: true,
      style: { fontWeight: "bold" },
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:5002/reservations/" + props.personName)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("error");
      })
      .then((data) => setReservations(data.reservations))
      .catch((err) => console.error(err));
  });

  return (
    <div className="container mt-5">
      <DataTable columns={columns} data={reservations}></DataTable>
    </div>
  );
};

export default ReservationTable;
