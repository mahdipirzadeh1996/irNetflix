import {
    createMovieFailure,
    createMovieStart, createMovieSuccess,
    deleteMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    getMoviesFailure,
    getMoviesStart,
    getMoviesSuccess
} from "./MovieActions";
import axios from "axios";

//GET with token
// export const getMovies = async (dispatch) => {
//     dispatch(getMoviesStart());
//     try {
//         const res = await axios.get("/movies/", {
//             headers: {
//                 token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
//             }
//         });
//         dispatch(getMoviesSuccess(res.data));
//         localStorage.setItem("movies", JSON.stringify(res.data))
//     } catch (err) {
//         dispatch(getMoviesFailure());
//     }
// }
//Get with mysql
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get("/movies");
        dispatch(getMoviesSuccess(res.data));
        localStorage.setItem("movies", JSON.stringify(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
}

//CREATE
export const createMovie = async (movie, img, imgTrailer, imgSm, imgMob, imgTrailerMob, dispatch) => {
    dispatch(createMovieStart());

    const data = new FormData();

    data.append("imgName", "img");
    data.append("file", img);
    data.append("file", imgTrailer);
    data.append("file", imgSm);
    data.append("file", imgMob);
    data.append("file", imgTrailerMob);
    data.append("movie", JSON.stringify(movie));

    await axios.post("/movies", data)
        .then((res) => {
            if (res.data === "Success") {
                dispatch(createMovieSuccess(res.data));
                alert("ویدیو جدید با موفقیت ثبت شد!");
            } else {
                dispatch(createMovieFailure());
                alert("مجددا تلاش کنید!");
            }
        }).catch((err) => {
            dispatch(createMovieFailure());
            alert("خطای حساس!");
            console.log("Error", err);
        })
    try {
        const res = await axios.get("/movies");
        dispatch(getMoviesSuccess(res.data));
        console.log(res.data);
        //localStorage.setItem("movies", JSON.stringify(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
}

//UPDATE
/*export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.update("/movies/", movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
}*/

//DELETE
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("/movies/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(deleteMovieSuccess(id));
        getMovies(dispatch);
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
}