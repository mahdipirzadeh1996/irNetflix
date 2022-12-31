import React, { useState, useCallback } from 'react';
import { ArrowBackOutlined } from "@material-ui/icons";
import { useHistory } from 'react-router';

import "./navbarMovie.scss";

const NavbarMovie = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const history = useHistory();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 0);
        return () => (window.onscroll = null);
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        
        history.goBack();
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className={"container"}>
                {/* <div className={"left"}>
                    <div className={"back"} onClick={handleInputChange}>
                        <ArrowBackOutlined className={"icon"} />
                        بازگشت
                    </div>
                </div> */}
                <div className={"right"}>
                    <h1 style={{ marginLeft: "20px", fontSize: "45px", color: "red", fontFamily: "sign" }}>Netphoenix</h1>
                </div>
            </div>
        </div>
    )
}

export default NavbarMovie;