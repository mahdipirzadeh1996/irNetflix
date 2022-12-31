import "./login.css";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext/AuthContext";
import {login} from "../../context/authContext/ApiCalls";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email, password}, dispatch);
    }
    return (
        <div className={"login"}>
            <form className={"loginForm"}>
                <input
                    type={"email"}
                    placeholder={"Email"}
                    className={"loginInput"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={"password"}
                    placeholder={"Password"}
                    className={"loginInput"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className={"loginButton"}
                    onClick={handleLogin}
                    disabled={isFetching}
                >
                    Login
                </button>
            </form>
        </div>
    )
}