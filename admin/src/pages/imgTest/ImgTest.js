import React, { useState } from 'react';
import { ArrowDropDown, Notifications, Search, ImportContactsTwoTone, PlayArrow } from "@material-ui/icons";

import "./imgTest.scss";

const ImgTest = () => {
    const [poster, setPoster] = useState(null);
    const [small, setSmall] = useState(null);

    const [showSmall, setShowSmall] = useState(false);

    return (
        <div className={"containerT"}>
            <div className={"navbar"}>
                <div className={"container"}>
                    <div className={"left"}>
                        <div className={"phone"}>
                            <img
                                src="https://lh3.googleusercontent.com/ogw/ADea4I7kOiIA8v73-6mtCWQH9yx7bBBcmHckWDksP3fSag=s83-c-mo"
                                alt=""
                            />
                        </div>
                        <div className={"profile"}>
                            <ArrowDropDown className={"icon"} />
                            <div className={"options"}>
                                <span>Settings</span>
                                <span>Logout</span>
                            </div>
                        </div>
                        <Search className={"icon"} />
                        <Notifications className={"icon"} />
                        <ImportContactsTwoTone />
                    </div>

                    <div className={"right"}>
                        {/* <span>New and Popular</span>
                                <span>My List</span> */}
                        <span>سریال ها</span>
                        <span>فیلم ها</span>
                        <span>خانه</span>
                        <h1 onClick={() => setShowSmall(!showSmall)} style={{ cursor: "pointer", marginLeft: "20px", fontSize: "45px", color: "red", fontFamily: "sign" }}>Netphoenix</h1>
                    </div>
                </div>
            </div>


            <div className={"featuredContainer"}>
                {!showSmall ?
                    <div className={"featured"}>
                        <img
                            className={"img"}
                            //src={isLand ? window.$url + poster[i].img : window.$url + poster[i].imgMob}
                            //src={"https://images.jdmagicbox.com/comp/jd_social/news/2018aug14/image-420745-m4seprv5vs.jpg"}
                            src={poster}
                            alt=""
                        />

                        <div className={"info"}>
                            <div className={"buttons"}>
                                <button className={"play"}>
                                    <PlayArrow />
                                    <span>ادامه</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    :
                    <div className={"test"}>
                        <div className={"listItem"}>
                            <img
                                //src={movie.imgSm !== undefined ? window.$url + movie.imgSm : null}
                                //src={"https://iv1.lisimg.com/image/16614621/284full-how-it-ends-poster.jpg"}
                                src={small}
                                alt="" />
                        </div>
                    </div>
                }



                <input type={"text"} placeholder={"Poster"} onChange={(e) => setPoster(e.target.value)} />
                <input type={"text"} placeholder={"Small"} onChange={(e) => setSmall(e.target.value)} />
            </div>

        </div>
    )
}


export default ImgTest;