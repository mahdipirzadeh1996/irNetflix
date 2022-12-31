import "./listItem.scss";
import { PlayArrow } from "@material-ui/icons";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, item, setMovieItem, setSendData }) => {
    const [hovered, setHovered] = useState(false);
    const [movie, setMovie] = useState({});

    const vidRef = useRef(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.post("/movies/find", { id: item });
                setMovie(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };

        getMovie();
    }, [item]);

    const handleInputChange = useCallback((event) => {
        event.preventDefault();
        setSendData(movie);
        setMovieItem(true);
    }, [setMovieItem, setSendData, movie])

    return (
        <div className={"test"} key={index}>
            <div
                className={"listItem"}
                // style={{ left: hovered ? index * 225 + index * 2.5 : null}}
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            >
                <div className={"videoContainer"}>
                    {hovered ?
                        <video
                            ref={vidRef}
                            src={movie.trailer}
                            //src={"https://s-v4.tamasha.com/statics/videos_file/0f/a5/B6l5m_0fa518d92d88aa276d62dc6987a618e77de7fb0c_n_360.mp4"}
                            loop muted
                            autoPlay
                        />
                        :
                        null
                    }
                </div>
                <img src={movie.imgSm !== undefined ? window.$url + movie.imgSm : null} alt="" />



                <div className={"itemInfo"}>
                    <div className={"icons"}>
                        <Link to={`/more/${movie.title}`} target={"_blank"}>
                            <PlayArrow className={"icon"} />
                        </Link>
                        {/* <Add className={"icon"} />
                        <ThumbUpAltOutlined className={"icon"} />
                        <ThumbDownAltOutlined className={"icon"} /> */}
                    </div>
                    <div className={"infoContainer"}>
                        <div className={"itemInfoTop"}>
                            <span>{movie.year}</span>
                            <span className={"limit"}>+{movie.limit}</span>
                            دقیقه
                            <span>{movie.duration !== undefined && movie.duration.substr(movie.duration.indexOf('و'), movie.duration.length - 1).match(/\d+/g)}</span>
                            ساعت و
                            <span>{movie.duration !== undefined && movie.duration.substr(0, movie.duration.indexOf('و')).match(/\d+/g)}</span>
                        </div>
                        {/* <div className={"desc"}>{movie.desc}</div> */}
                        <div className={"genre"}>{movie.genre}</div>
                    </div>
                </div>

                {/* {hovered && (<>
                        <div className={"itemInfo"}>
                            <div className={"icons"}>
                                <PlayArrow className={"icon"} />
                                <Add className={"icon"} />
                                <ThumbUpAltOutlined className={"icon"} />
                                <ThumbDownAltOutlined className={"icon"} />
                            </div>
                            <div className={"itemInfoTop"}>
                                <span>{movie.duration}</span>
                                <span className={"limit"}>+{movie.limit}</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className={"desc"}>{movie.desc}</div>
                            <div className={"genre"}>{movie.genre}</div>
                        </div>
                    </>)} */}
            </div>
        </div>
    )
}

export default ListItem;