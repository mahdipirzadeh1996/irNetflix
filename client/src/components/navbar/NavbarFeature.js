import React, { useState, useEffect, useCallback } from 'react';
import { ArrowDropDown, Notifications, Search, ImportContactsTwoTone, PlayArrow, Movie, InsertLink, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in/lib/FadeIn";
import { Liquidswipe } from "react-liquidswipe";
import { isMobile } from "react-device-detect";

import "./navbarFeature.scss";
import MovieItem from "../../pages/movieItem/MovieItem";
import logo from "../../image/netPhoenix_logo.png";

const NavbarFeature = ({ movieItem, setMovieItem, sendData, setSendData }) => {
    const [phone, setPhone] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [poster, setPoster] = useState([]);
    const [isLand, setIsLand] = useState();
    const [open, setOpen] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 150);
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        //const temp = JSON.parse(localStorage.getItem("user"));
        //setPhone(temp[0]["phone"]);
        setPhone("hi");

        const getPosterList = async () => {
            try {
                const res = await axios.post("movies/lists", { data: "پوستر" });
                getPosters(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getPosterList();

        if (window.innerWidth > window.innerHeight) {
            setIsLand(true);
        } else if (window.innerWidth < window.innerHeight) {
            setIsLand(false);
        }
    }, [phone]);

    const getPosters = async (data) => {
        try {
            const res = await axios.post("movies/films", { data: JSON.parse(data[0].content) });
            setPoster(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const Components = []

    function refreshPage() {
        window.location.reload(false);
    }

    window.addEventListener("orientationchange", function (event) {
        refreshPage();
        if (window.innerWidth > window.innerHeight) {
            setIsLand(false);
        } else if (window.innerWidth < window.innerHeight) {
            setIsLand(true);
        }
    });

    const handleInputChange = useCallback((event, i) => {
        event.preventDefault();
        setSendData(poster[i]);
        setMovieItem(true);
    }, [setMovieItem, setSendData, poster]);

    if (poster !== []) {
        for (let i = 0; i <= poster.length - 1; i++) {
            Components.push(
                <div className={"featured"}>

                    <img
                        className={"img"}
                        src={isLand ? window.$url + poster[i].img : window.$url + poster[i].imgMob}
                        alt=""
                    />

                    <div className={"info"}>
                        <FadeIn>
                            <div className={"buttons"}>
                                <button className={"play"} onClick={(e) => handleInputChange(e, i)}>
                                    <PlayArrow />
                                    <span>ادامه</span>
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={"navbarFeature"}>
            <div style={{ display: movieItem && "none" }} className={isScrolled ? "navbar scrolled" : "navbar"}>
                {isMobile
                    ?
                    <div className={"containerMob"}>
                        <div className={"leftMob"}>
                            {/* <Menu onClick={() => setMenu(!menu)} className={"icon"} /> */}
                            <div className={open ? "menu" : "menuClose"}>
                                <div className={"header"}>
                                    <img src={logo} alt={""} />
                                </div>
                                <div className={"body"}>
                                    <h1>
                                        خانه
                                        <Home className={"iconn"} />
                                    </h1>
                                    <h1>
                                        فیلم
                                        <Movie className={"iconn"} />
                                    </h1>
                                    <h1>
                                        سریال
                                        <InsertLink className={"iconn"} />
                                    </h1>
                                    <Link to={"/search"} className={"link"}>
                                        <h1>
                                            جستجو
                                            <Search className={"iconn"} />
                                        </h1>
                                    </Link>
                                    {/* <a href="/">
                                        فیلم
                                        <Movie />
                                    </a>
                                    <a href="/">
                                        سریال
                                        <InsertLink />
                                    </a>
                                    <a href="/search">
                                        جستجو
                                        <Search />
                                    </a> */}
                                </div>
                            </div>
                            <button className={"btn"} onClick={() => setOpen(!open)}>
                                <div className={open ? "first" : "firstClose"} />
                                <div className={open ? "second" : "secondClose"} />
                                <div className={open ? "third" : "thirdClose"} />
                            </button>
                        </div>
                        <div className={"rightMob"}>
                            <h1 style={{ textAlign: "right", ontSize: "45px", color: "red", fontFamily: "sign" }}>Netphoenix</h1>
                        </div>
                    </div>
                    :
                    <div className={"container"}>
                        <div className={"left"}>
                            <div className={"phone"}>
                                <img
                                    src="https://lh3.googleusercontent.com/ogw/ADea4I7kOiIA8v73-6mtCWQH9yx7bBBcmHckWDksP3fSag=s83-c-mo"
                                    alt=""
                                />
                                <div className={"phoneContainer"}>
                                    <span>{phone}</span>
                                </div>
                            </div>
                            <div className={"profile"}>
                                <ArrowDropDown className={"icon"} />
                                <div className={"options"}>
                                    <span>Settings</span>
                                    <span>Logout</span>
                                </div>
                            </div>
                            <Link to={"/search"} className={"link"}>
                                <Search className={"icon"} />
                            </Link>
                            <Notifications className={"icon"} />
                            <Link to={"/magazine"} className={"link"} style={{ margin: "0px" }}>
                                <ImportContactsTwoTone />
                            </Link>
                        </div>

                        <div className={"right"}>
                            {/* <span>New and Popular</span>
                                <span>My List</span> */}
                            <Link to={"/series"} className={"link"}>
                                <span>سریال ها</span>
                            </Link>
                            <Link to={"/movies"} className={"link"}>
                                <span>فیلم ها</span>
                            </Link>
                            <Link to={"/"} className={"link"}>
                                <span>خانه</span>
                            </Link>
                            {/* <img
                            src={logo}
                            alt=""
                        /> */}
                            <h1 style={{ marginLeft: "20px", fontSize: "45px", color: "red", fontFamily: "sign" }}>Netphoenix</h1>
                        </div>
                    </div>
                }

            </div>


            <div style={{ display: movieItem && "none" }} className={isScrolled ? "featuredContainer scrolled" : "featuredContainer"}>
                {
                    Components.length === 10
                        ?
                        <Liquidswipe
                            components={Components}
                            style={{
                                height: "100%",
                                width: "auto",
                            }}
                        />
                        :
                        null
                }
            </div>
            {movieItem &&
                <MovieItem movie={sendData} setMovieItem={setMovieItem} />}
        </div>


    )
}

export default NavbarFeature;