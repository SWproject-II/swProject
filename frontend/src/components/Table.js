import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ResApi } from "../Constants";

const Table = () => {
  const [reservations, setReservations] = useState([]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
      reorder: true,
      hide: "sm",
      style: { background: "lightblue", fontWeight: "bold" },
    },
    {
      name: "Person Name",
      selector: (row) => row.person_name,
      sortable: true,
      center: true,
      reorder: true,
      style: { fontWeight: "bold" },
    },
    {
      name: "Game Name",
      selector: (row) => row.game_name,
      sortable: true,
      center: true,
      reorder: true,
      style: { background: "lightblue", fontWeight: "bold" },
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.start_date).toLocaleDateString(),
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
    fetch(ResApi)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("error");
      })
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="container mt-5"
      style={{ marginLeft: "50px", marginRight: "50px" }}
    >
      <DataTable columns={columns} data={reservations}></DataTable>
    </div>
  );
};

export default Table;
