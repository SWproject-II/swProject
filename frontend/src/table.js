import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'


export default function Table() {

    const [test, setTest] = useState([]);

    const Columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true

        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        }
    ]

    useEffect(() => {
        fetch("https://run.mocky.io/v3/f86f5b78-698d-4286-a80e-7a30ce763189")
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    alert('error')

            })
            .then(data => setTest(data.faces))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='container mt-5'>
            <DataTable
                columns={Columns}
                data={test}
            ></DataTable>
        </div>
    )
}