import axios from "axios";

import {
    createUserFailure, createUserStart, createUserSuccess,
    deleteUserFailure, deleteUserStart, deleteUserSuccess,
    getUsersFailure, getUsersStart, getUsersSuccess
} from "./UserActions";

//GET
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("/users/", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(getUsersSuccess(res.data));
        localStorage.setItem("users", JSON.stringify(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
}

//CREATE
export const createUser = async (movie, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post("/movies/", movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(createUserSuccess(res.data));
    } catch (err) {
        dispatch(createUserFailure());
    }
}

//DELETE
export const deleteUser = async (phone, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + phone, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(deleteUserSuccess(phone));
        getUsers(dispatch);
    } catch (err) {
        dispatch(deleteUserFailure());
    }
}