import "./list.scss";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";

const List = ({ list, movieItem, setMovieItem, setSendData }) => {
    const listRef = useRef();
    const contentJson = JSON.parse(list.content);

    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [distance, setDistance] = useState(0)

    const handleClick = (direction) => {
        setIsMoved(true);
        let temp;

        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            temp = 230 + distance;
            setDistance(230 + distance);
            listRef.current.style.transform = `translateX(${temp}px)`
        } else if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            temp = -230 + distance;
            setDistance(-230 + distance);
            listRef.current.style.transform = `translateX(${temp}px)`
        }
    }

    return (
        <div style={{display: movieItem && "none"}} className={"list"}>
            <span className={"listTitle"}>{list.title}</span>
            <div className={"wrapper"}>
                <ArrowBackIosOutlined
                    className={"sliderArrow left"}
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className={"container"} ref={listRef}>
                    {contentJson.map((item, index) => (
                        <ListItem key={index} item={item} setMovieItem={setMovieItem} setSendData={setSendData} />
                    ))}
                </div>
                <ArrowForwardIosOutlined className={"sliderArrow right"} onClick={() => handleClick("right")} />
            </div>
        </div>
    )
}

export default List;