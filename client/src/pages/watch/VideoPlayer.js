import React from 'react';
import ReactPlayer from "react-player";

import "./videoPlayer.scss";

const VideoPlayer = () => {
    return (
        <div>
            <video className={"video"} autoPlay={true} progress controls src={"http://trainbit.com/files/0494521484/origin_4wur5iwspeO2qCY76eq7N5O8LD1TD3c2VZvPAdkb.mp4"}/>
        </div>
    )
}

export default VideoPlayer;