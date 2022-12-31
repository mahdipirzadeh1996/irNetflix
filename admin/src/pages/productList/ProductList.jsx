import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import "./productList.css";
import {productRows} from "../../dummyData";
import {MovieContext} from "../../context/movieContext/MovieContext";
import {deleteMovie, getMovies} from "../../context/movieContext/ApiCalls";

export default function ProductList() {
  const [data, setData] = useState([]);
  const {movies, dispatch} = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch).then(r => r);
    setData(JSON.parse(localStorage.getItem("movies")))
  }, [dispatch])

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
    setData(data.filter((item) => item._id !== id));
  };
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
            <Link to={{pathname: "/product/" + params.row.id, movie: params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r.id}
      />
    </div>
  );
}
