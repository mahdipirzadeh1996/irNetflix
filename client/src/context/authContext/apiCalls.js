import Axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());

    const validateCode = () => {
        Axios.post("http://localhost:8800/api/validateSms", user).then((res) => {
            // if (res.data.length !== 0) {
            //     const serverCode = res.data[0]["code"];
            //     if (serverCode !== code) {
            //         alert("Wrong code!");
            //     } else if (serverCode === code) {
            //         expiredCode();
            //         clearTimeout(myCounter);
            //     }
            // } else {
            //     alert("Code is expierd");
            // }
            if (res.data === "Success") {
                insertUser();
            } else if (res.data === "Failed") {
                loginFailure();
                alert("Wrong code");
            }
        });
    }
    
    const insertUser = () => {
        Axios.post("http://localhost:8800/api/insertUser", user).then((res) => {
            if (res.data === "Login" || res.data === "Register") {
                getUser();
            }
        });
    }
    
    const getUser = () => {
        Axios.post("http://localhost:8800/api/getUser", user).then((res) => {
            dispatch(loginSuccess(res.data));
        });
    }

    try {
        // const res = await Axios.post("auth/login", user);
        // dispatch(loginSuccess(res.data));

        validateCode();
    } catch (err) {
        dispatch(loginFailure());
    }
}