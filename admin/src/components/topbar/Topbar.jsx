import React, {useContext} from "react";
import "./topbar.scss";
import {NotificationsNone, Language, Settings} from "@material-ui/icons";
import {AuthContext} from "../../context/authContext/AuthContext";
import {logout} from "../../context/authContext/AuthActions";

export default function Topbar() {
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("H")
        dispatch(logout());
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">lamaadmin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <div className={"profile"}>
                        <img
                            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt="" className="topAvatar"/>
                        <div className={"options"}>
                            <span className={"logout"} onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
