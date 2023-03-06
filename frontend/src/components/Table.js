import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MOCK_API } from "../Constants";

export default function Table() {
  const [test, setTest] = useState([]);

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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      reorder: true,
      style: { fontWeight: "bold" },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      reorder: true,
      style: { background: "lightblue", fontWeight: "bold" },
    },
  ];

  useEffect(() => {
    fetch(MOCK_API)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("error");
      })
      .then((data) => setTest(data.faces))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <DataTable columns={columns} data={test}></DataTable>
    </div>
  );
}
