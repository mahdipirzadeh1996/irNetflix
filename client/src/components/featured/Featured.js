import "./featured.scss";
import { PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";
import { Liquidswipe } from "react-liquidswipe";

const Featured = ({ type }) => {
    const [poster, setPoster] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 0);
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        // const getRandom = async () => {
        //     try {
        //         const res = await axios.get(`movies/random?type=${type}`, {
        //             headers: {
        //                 token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWQzZGIwMGYzYmRhMWZiODk3MWNiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTIxNzY5MiwiZXhwIjoxNjMxNjQ5NjkyfQ.hSl9hDzUbik6PgHM0JUe_lp99S46yABgoeB0MHh3iy8"
        //             }
        //         })
        //         setContent(res.data[0]);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };
        // getRandom();
        getPosterList();
    });

    const getPosterList = async () => {
        try {
            const res = await axios.post("movies/lists", { data: "پوستر" });
            getPosters(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getPosters = async (data) => {
        try {
            const res = await axios.post("movies/films", { data: JSON.parse(data[0].content) });
            setPoster(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const Components = []

    if (poster !== []) {
        for (let i = 0; i <= poster.length - 1; i++) {
            Components.push(
                <div className={"featured"}>
                    <img 
                        className={"img"}
                        src={window.$url + poster[i].img}
                        alt=""
                    />
                    <div className={"info"}>
                        <FadeIn>
                            <div className={"buttons"}>
                                <Link className={"link"} to={{ pathname: "/more/", movie: poster[i] }}>
                                    <button className={"play"}>
                                        <PlayArrow />
                                        <span>Continue</span>
                                    </button>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className={isScrolled ? "featuredContainer scrolled" : "featuredContainer"}>
            {
                Components.length === 10
                    ?
                    <Liquidswipe
                        components={Components}
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                    />
                    :
                    null
            }
        </div>
    )
}

export default Featured;

// {type && (
//     <div className={"category"}>
//         <span>{type === "movies" ? "Movies" : "Series"}</span>
//         <select name={"genre"} id={"genre"}>
//             <option>Genre</option>
//             <option value={"adventure"}>Adventure</option>
//             <option value={"comedy"}>Comedy</option>
//             <option value={"crime"}>Crime</option>
//             <option value={"fantasy"}>Fantasy</option>
//             <option value={"historical"}>Historical</option>
//             <option value={"horror"}>Horror</option>
//             <option value={"romance"}>Romance</option>
//             <option value={"sci-fi"}>Sci-fi</option>
//             <option value={"thriller"}>Thriller</option>
//             <option value={"western"}>Western</option>
//             <option value={"animation"}>Animation</option>
//             <option value={"drama"}>Drama</option>
//             <option value={"documentary"}>Documentary</option>
//         </select>
//     </div>
// )}