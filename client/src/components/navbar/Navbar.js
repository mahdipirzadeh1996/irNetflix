import "./navbar.scss";
import React, { useState, useEffect } from "react";
import { ArrowDropDown, Notifications, Search, ImportContactsTwoTone } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../image/netPhoenix_logo.png";

const Navbar = () => {
    //const [currentScrollHeight, setCurrentScrollHeight] = useState(null);
    const [phone, setPhone] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 0);
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        //const temp = JSON.parse(localStorage.getItem("user"));
        //setPhone(temp[0]["phone"]);
        setPhone("hi");
        console.log(isScrolled)
    }, [phone, isScrolled])


    // window.onscroll = () => {
    //     const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
    //     if (currentScrollHeight != newScrollHeight){
    //         setCurrentScrollHeight(newScrollHeight);
    //     }
    // }

    //const opacity = Math.min(100 / currentScrollHeight, 1);

    // const upp = async () => {
    //     const res = await axios.post('movies/upp');

    // }

    return (
        <div className={"navbar"}>
            <div className={isScrolled ? "container scrolled" : "container"}>
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
                    <Link to={"/magazine"} className={"link"} style={{margin: "0px"}}>
                        <ImportContactsTwoTone />
                    </Link>
                </div>

                <div className={"right"}>
                    <Link to={"/"} className={"link"}>
                        <span>HomePage</span>
                    </Link>
                    <Link to={"/series"} className={"link"}>
                        <span>Series</span>
                    </Link>
                    <Link to={"/movies"} className={"link"}>
                        <span>Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                    <img
                        src={logo}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
export default Navbar;