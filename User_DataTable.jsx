import React, { useEffect, useState } from "react"
import axios from "axios";
import DataTable from 'react-data-table-component';

const User_DataTable = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users")
                console.log(response.data)
                setUser(response.data);
            }
            catch (error) {
                console.log("Error Fetching User", error);
            }
        };
        fetchData();

    }, []);

    function handleFilter(event){
        const newData=users.filter(row=>{
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setUser(newData)
    }

    const columns=[
        {
            name:'Name',
            selector:row=>row.name,
            sortable:true
        },
        {
            name:'Username',
            selector:row=>row.username,
            sortable:true
        },
        {
            name:'Email',
            selector:row=>row.email,
            sortable:true
        },
        {
            name:'Address',
            selector:row=>`${row.address.street}, ${row.address.city}`,
            sortable:true
        },
        {
            name:'Phone',
            selector:row=>row.phone,
            sortable:true
        },
        {
            name:'Website',
            selector:row=>row.website,
            sortable:true
        },
        {
            name:'Company Name',
            selector:row=>row.company.name,
            sortable:true
        }

    ]

    return (
        <div className="container mt-5">
            <div className="w-60">
                <input type="text" onChange={handleFilter} className="form-control" placeholder="Search"/>
            </div>
            {users.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={users}
                    selectableRows
                    fixedHeader
                />
            ) : (
                <p>Loading Data</p>
            )}

        </div>
    )
};

export default User_DataTable;
