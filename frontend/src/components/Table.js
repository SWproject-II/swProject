import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MOCK_API } from "../constants";

export default function Table() {
  const [test, setTest] = useState([]);

  const Columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
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
      <DataTable columns={Columns} data={test}></DataTable>
    </div>
  );
}
