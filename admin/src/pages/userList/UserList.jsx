import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "./userList.css";
//import { userRows } from "../../dummyData";
import {UserContext} from "../../context/userContext/UserContext";
import {getUsers, deleteUser} from "../../context/userContext/ApiCalls";

export default function UserList() {
  const [data, setData] = useState([]);
  const {dispatch} = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch).then(r => r);
    setData(JSON.parse(localStorage.getItem("users")));
  }, [dispatch])

  const handleDelete = (phone) => {
    deleteUser(phone, dispatch)
    setData(data.filter((item) => item.phone !== phone));
  };

  const test = [
    { field: "phone", headerName: "Phone", width: 115 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "family", headerName: "Family", width: 150 },
    { field: "packageDate", headerName: "PackageDate", width: 150 },
    { field: "buyCount", headerName: "BuyCount", width: 120 },
    { field: "watchedTime", headerName: "WatchedTime", width: 120 },
    { field: "mostGenre", headerName: "MostGenre", width: 120 },
    { field: "createdAt", headerName: "CreatedAt", width: 120 },
    { field: "status",
     headerName: "Status",
      width: 120,
      renderCell: (params) => {
        if (params.row.status === 0) {
          return (
            <>Active</>
          )
        } else {
          <>Block</>
        }
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/user/" + params.row.phone, user: params.row}}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.phone)}
            />
          </>
        );
      },
    },
  ]

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data && data}
        disableSelectionOnClick
        columns={test}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.phone}
      />
    </div>
  );
}
