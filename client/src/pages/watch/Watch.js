import "./watch.scss";
import {ArrowBackOutlined} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";

export default function Watch() {
    const location = useLocation();
    const movie = location.movie;
    return (
        <div className={"watch"}>
            <Link to={"/"}>
                <div className={"back"}>
                    <ArrowBackOutlined/>
                    Home
                </div>
            </Link>
            <video className={"video"} autoPlay={true} progress controls src={movie.video}/>
            {/* <video className={"video"} autoPlay={true} progress controls src={"http://localhost:8800/video"}/> */}
        </div>
    );
}