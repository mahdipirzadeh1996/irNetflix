import React, { useEffect, useState } from 'react';
import HTMLFlipBook from "react-pageflip";
import Axios from "axios";

import "./book.scss";

const Book = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const res = await Axios.get("movies");
            setData(res.data);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        // <div>
        //     <FlipPage
        //         orientation="horizontal"
        //         showSwipeHint
        //         uncutPages
        //         perspective={"200em"}
        //         showHint
        //         showTouchHint
        //         reverse
        //     >
        //         <article>
        //             <h1>My awesome first article</h1>
        //             <p>My awesome first content</p>
        //         </article>
        //         <article>
        //             <h1>My wonderful second article</h1>
        //             <p>My wonderful second content</p>
        //         </article>
        //         <article>
        //             <h1>My excellent third article</h1>
        //             <p>My excellent third content</p>
        //         </article>
        //     </FlipPage>
        // </div>

        <div className={"bookContainer"}>
            <HTMLFlipBook width={300} height={500}>
                {data.map((movie, index) => (
                    <article style={{ width: "300px ", padding: "10px 20px" }} key={movie.id}>
                        <div className={"imgContainer"}>
                            {
                                index % 2 === 0
                                    ?
                                    <>
                                        <div className={"maskL"} />
                                        <button className={"btnL"}>ادامه</button>
                                    </>
                                    :
                                    <>
                                        <div className={"maskR"} />
                                        <button className={"btnR"}>ادامه</button>
                                    </>
                            }
                            <img className={"img"} src={window.$url + movie.imgMob} alt={""} style={{ width: "100%", height: "100%" }} />
                        </div>
                    </article>
                ))}
                {/* <div className="demoPage">Page 1</div>
            <div className="demoPage">Page 2</div>
            <div className="demoPage">Page 3</div>
            <div className="demoPage">Page 4</div> */}
            </HTMLFlipBook>
        </div>
    );
}

export default Book;