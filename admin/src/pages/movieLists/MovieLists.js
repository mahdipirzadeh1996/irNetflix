import React, {useEffect, useState} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Axios from 'axios';

import { productRows } from "../../dummyData";

import "./movieLists.scss";

const MovieLists = () => { const [data, setData] = useState([]);

    useEffect(() => {
        getLists();
    }, []);

    const getLists = async () => {
        try {
            const res = await Axios.get("movies/lists");
            setData(res.data);
            //console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    const select = async(e) => {
        e.preventDefault();
        const lId = JSON.parse(data[0].content);
        const datta = new FormData();
        datta.append("ids", lId)
        try {
            const res = await Axios.post("movies/films", {data: lId});
            
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "movie",
            headerName: "Movie",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.imgSm} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "genre", headerName: "Genre", width: 120 },
        { field: "year", headerName: "Year", width: 120 },
        { field: "limit", headerName: "Limit", width: 120 },
        { field: "isSeries", headerName: "isSeries", width: 120 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={{ pathname: "/product/" + params.row.id, movie: params.row }}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className={"container"}>
            <button onClick={select}>Select</button>
            <DataGrid
                rows={productRows}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={r => r.id}
            />
        </div>
    )
}
export default MovieLists;