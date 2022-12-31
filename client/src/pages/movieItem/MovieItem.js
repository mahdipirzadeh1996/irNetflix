import React, { useEffect, useState } from 'react';
import { ReactVideo } from "reactjs-media";
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';
import axios from 'axios';
import Collapsible from 'react-collapsible';

import "./movieItem.scss";
import NavbarMovie from '../../components/navbar/NavbarMovie';
import imdb from "../../image/imdb.png";

const MovieItem = (props) => {
    const [movie, setMovie] = useState();
    const [isOpenS, setIsOpenS] = useState(false);

    const params = useParams();
    const title = params.title;

    useEffect(() => {
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });
        getMovie();
    }, []);

    const getMovie = async () => {
        try {
            const res = await axios.post("/movies/film", {
                title: String(title),
            });
            setMovie(res.data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const setVideoImg = () => {
        if (movie !== undefined) {
            if (isMobile) {
                return (window.$url + movie.imgTrailerMob)
            } else {
                return (window.$url + movie.imgTrailer);
            }
        } else {
            return ("");
        }
    }

    const setImg = () => {
        if (movie !== undefined) {
            if (isMobile) {
                return (window.$url + movie.imgMob)
            } else {
                return (window.$url + movie.img);
            }
        } else {
            return ("");
        }
    }

    return (
        <div className={"movieItem"}>
            <NavbarMovie setMovieItem={props.setMovieItem} search={props.search} />
            <div className={"movieContainer"}>
                <div className={"mask"} />
                <div className={"content"}>
                    <div className={"leftPart"}>
                        <div className={"leftContent"}>
                            <div className={"firstLeftContent"}>
                                <h1>{movie !== undefined ? movie.title : ""} </h1>
                                <h3>({movie !== undefined ? movie.year : ""})</h3>
                            </div>
                            <div className={"rankContainer"}>
                                <img src={imdb} alt={""} />
                                <h3>
                                    {movie !== undefined ? movie.imdb : ""}/10
                                </h3>
                            </div>
                        </div>
                        <div className={"seperator"} />
                        <div className={"descContent"}>
                            <h2>
                                :خلاصه داستان
                            </h2>
                            <h3>{movie !== undefined ? movie.desc : ""}</h3>
                        </div>
                        <div className={"seperator"} />
                        <div className={"moreContainer"}>
                            <div className={"more"}>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>ستارگان:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.stars : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>کارگردان:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.directors : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>نویسندگان:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.writters : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>کشور:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.country : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>سال:</h3>
                                    <h3 className={"contentTxt"}>({movie !== undefined ? movie.year : ""})</h3>
                                </div>
                            </div>
                            <div className={"more"}>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>ژانر:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.genre : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>زبان:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.language : ""}</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>رده سنی:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.limit : ""}+</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>فروش جهانی:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.boxOffice : ""} میلیون دلار</h3>
                                </div>
                                <div className={"moreContent"}>
                                    <h3 className={"title"}>بودجه:</h3>
                                    <h3 className={"contentTxt"}>{movie !== undefined ? movie.budget : ""} میلیون دلار</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"seperator"} />
                        <div className={"trailerContainer"}>
                            <ReactVideo
                                src={movie !== undefined ? movie.trailer : ""}
                                //src={"https://ads.cdn.asset.aparat.com/aparat-video/e71e5f1f74cc19d356358d7ba5a6af7139206360-1080p.apt/chunk.m3u8?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNkOTk2MjU5YjIwZjU2ZGFmYTc0MmM3NGFkNjg0MTcyIiwiZXhwIjoxNjM2NjEzODM5LCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.ksq1rV4XLcMSb_v95rh3vcxfH6xfoaSFygsLZ9iJA80"}
                                poster={setVideoImg()}
                                primaryColor="red"
                            />
                        </div>
                        <div className={"seperator"} />
                        {movie !== undefined && movie.isSeries === 1 ?
                            <div className={"downloadBox"}>
                                {movie !== undefined && JSON.parse(movie.video).map((item, index) => (
                                    // <div className={isOpenS ? "seasonContainer" : "seasonContainer.close"} onClick={() => setIsOpenS(!isOpenS)}>
                                    //     {index + 1} فصل
                                    //     {JSON.parse(movie.video)[index].map((item, index) => (
                                    //         <div className={isOpenS ? "episode" : "episodeClose"}>
                                    //             {index + 1} قسمت
                                    //         </div>
                                    //     ))}
                                    // </div>
                                    <Collapsible key={index} trigger={<div style={{ width: "100%", textAlign: "center", cursor: "pointer" }}>{index + 1} فصل</div>} openedClassName={"seasonContainer"} className={"seasonContainer"}>
                                        {JSON.parse(movie.video)[index].map((item, index) => (
                                            <div key={index}>
                                                <div className={"seperator"} />
                                                <a className={"episode"} href={item} target="_blank" rel="noreferrer noopener">
                                                    {index + 1} قسمت
                                                </a>
                                            </div>
                                        ))}
                                    </Collapsible>
                                ))}
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={"rightPart"}>
                    </div>
                </div>
                <img className={"back"} src={setImg()} alt={""} />
            </div>
        </div>
    )
}

export default MovieItem;