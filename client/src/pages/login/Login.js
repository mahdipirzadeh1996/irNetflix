import { useState, useEffect, useContext } from "react";
// import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import "./login.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

export default function Login() {
    const history = useHistory();
    const location = useLocation();

    const [code, setCode] = useState("");
    //const [counter, setCounter] = useState(59);
    const { dispatch } = useContext(AuthContext);

    let myCounter;

    useEffect(() => {
        if (location.phone === undefined) {
            clearTimeout(myCounter);
            history.goBack();
        }

        //counter > 0 && timmer();

        // if (counter === 0) {
        //     expiredCode();
        //     history.goBack();
        // }
    });

    // const timmer = () => {
    //     myCounter = setTimeout(() => setCounter(counter - 1), 1000);
    // }

    const checkCode = (e) => {
        e.preventDefault();

        if (code === "") {
            alert("Please enter code");
        } else {
            if (code.length < 6) {
                alert("Your code must have at least 6 digit")
            } else {
                const phone = location.phone
                login({ phone, code }, dispatch);
            }
        }
    }

    // const expiredCode = () => {
    //     try {
    //         const phone = location.phone
    //         Axios.delete(`http://localhost:8800/api/deleteSms/${phone}`);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
        <div className={"login"}>
            <div className={"top"}>
                <div className={"wrapper"}>
                    <img className={"logo"}
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                </div>
            </div>
            <div className={"container"}>
                <form>
                    <h1>کد ارسال شده را وارد کنید</h1>
                    <input
                        maxLength={"6"}
                        type={"phone"}
                        placeholder={"کد 6 رقمی"}
                        onChange={(e) => { setCode(e.target.value) }}
                    />

                    {/* <a className={"mutedLink"}>
                        زمان باقی مانده: <a className={"boldLink"}>{counter}</a>
                    </a> */}

                    <button
                        className={"loginButton"}
                        onClick={checkCode}
                        //disabled={isFetching}
                    >ورود</button>
                </form>
            </div>
        </div>
    );
}