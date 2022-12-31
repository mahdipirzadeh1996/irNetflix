import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

import "./searchItem.scss";
import imdb from "../../image/imdb.png";
const SearchItem = ({ item, i, goto }) => {
    const [hovered, setHovered] = useState(false);

    const handleInputChange = useCallback((event, i) => {
        event.preventDefault();
        goto(true, item)
    }, [goto, item]);
    return (
        <div
            //onClick={handleInputChange}
            className={"itemContainer"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link className={"link"} to={`/more/${item.title}`} target={"_blank"}>
                <img src={window.$url + item.imgMob} alt={""} />
                {hovered && (
                    <div className={"infoContainer"}>
                        <span className={"title"}>
                            {item.title}
                        </span>
                        <span className={"year"}>
                            {item.year}
                        </span>
                        <div className={"raitingContainer"}>
                            <img src={imdb} alt={""} />
                            <span className={"imdb"}>
                                {item.imdb}
                            </span>
                        </div>
                        <div className={"raitingContainer"}>
                            <span className={"dir"}>ِDirector: </span>
                            <span className={"imdb"}>
                                {item.directors}
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default SearchItem;