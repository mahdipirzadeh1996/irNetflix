import "./register.scss";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register() {
    const history = useHistory();

    const [phone, setPhone] = useState("");

    const handleStart = (e) => {
        e.preventDefault();

        if (phone === "") {
            alert("Please enter your phone number");
        } else {
            if (phone.length < 11) {
                alert("Your phone number must have at least 11 digit")
            } else {
                deletePrevios();
            }
        }
    }

    const setData = () => {
        try {
            Axios.post("http://localhost:8800/api/insertSms", {
                phone: phone,
            }).then((res) => {
                if (res.data === "successInsert") {
                    history.push({
                        pathname: '/login',
                        phone: phone,
                    });
                    //switchToSendCode(phone);
                } else {
                    alert("Try again!");
                }
            });
        } catch (e) {
            console.log(e)
        }
    }
    const deletePrevios = () => {
        try {
            Axios.delete(`http://localhost:8800/api/deleteSms/${phone}`).then((res, err) => {
                if (res.data === "successDelete") {
                    setData();
                } else {
                    alert("Try again!");
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"register"}>
            <div className={"top"}>
                <div className={"wrapper"}>
                    <img className={"logo"}
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                </div>
            </div>
            <div className={"container"}>
                <h1>فیلم های سینمایی ، برنامه های تلویزیونی و موارد دیگر</h1>
                <h2>هر جا تماشا کنید ، هر زمان لغو کنید</h2>
                <p>
                    آماده تماشا هستید؟ برای ورود ، تلفن خود را وارد کنید
                </p>
                <div className={"input"}>
                    <button className={"registerButton"} onClick={handleStart}>شروع کنید</button>
                    <input type={"phone"} placeholder={"شماره موبایل"} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
            </div>
        </div>
    );
}