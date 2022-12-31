import "./newProduct.css";
import { useContext, useState } from "react";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/ApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

import {
    createMovieFailure,
    createMovieStart,
    createMovieSuccess,
} from "../../context/movieContext/MovieActions";
import Axios from "axios";

export default function NewProduct() {
    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTrailer, setImgTriler] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [imgMob, setImgMob] = useState(null);
    const [imgTrailerMob, setImgTrailerMob] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const { dispatch } = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    }
    const handleSeriesChange = (e) => {

            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""

        const value = [
            [
                "https://uploadb.me/direct/rtazm1leemrf/Vikings.S01E01.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/dn4r8o04m8ks/Vikings.S01E02.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/osoc3ejsxhyi/Vikings.S01E03.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/913zcco3he6k/Vikings.S01E04.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/718vf4vjk07s/Vikings.S01E05.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/wlre3sc1h6w3/Vikings.S01E06.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/euazmb6tla3g/Vikings.S01E07.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/jxpfs1lle3lu/Vikings.S01E08.720p.BluRay.x265.mkv.html",
                "https://uploadb.me/direct/tx57hj9p3efy/Vikings.S01e09.720p.BluRay.x265.mkv.html"
            ],
            [
                "https://uploadb.me/direct/xvh1c97pvuk7/Vikings S02E01 HDTV x264 AAC E-Subs [GWC].mkv.html",
                "https://uploadb.me/direct/l9kthco3dhll/Vikings S02E02 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/h28qfvsqqyaj/Vikings S02E03 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/nwnrjjusna66/Vikings S02E04 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/e84dg1p9phb1/Vikings S02E05 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/m43spm2ol8m4/Vikings S02E06 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/fs8ulw2ukjyo/Vikings S02E07 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/oycu60dk2ddv/Vikings S02E08 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/4vl3izcosvgj/Vikings S02E09 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/bykp50l256a9/Vikings S02E10 HDTV x264 AAC E-Subs [GWC].mp4.html"
            ],
            [
                "https://uploadb.me/direct/qwcvgb44054v/Vikings S03E01 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/stkexvbxr8bf/Vikings S03E02 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/k5tvd6yimfrv/Vikings S03E03 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/koc5xdow2vkl/Vikings S03E04 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/5pzdnpclh14s/Vikings S03E05 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/tikhgrmnpl9n/Vikings S03E06 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/zhtuz7o50kzi/Vikings S03E07 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/al6ncv3tub1c/Vikings S03E08 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/7hm33z1t1pqm/Vikings S03E09 HDTV x264 AAC E-Subs [GWC].mp4.html",
                "https://uploadb.me/direct/eak9xoqwlcbc/Vikings S03E10 HDTV x264 AAC E-Subs [GWC].mp4.html"
            ],
            [
                "https://uploadb.me/direct/f26o9fi4dl3a/S04E01 - A Good Treason - Ehhhh.mkv.html",
                "https://uploadb.me/direct/h41939xc6nqp/S04E02 - Kill the Queen - Ehhhh.mkv.html",
                "https://uploadb.me/direct/ea2b8b6l9mux/S04E03 - Mercy - Ehhhh.mkv.html",
                "https://uploadb.me/direct/59kic3qoeo63/S04E04 - Yol - Ehhhh.mkv.html",
                "https://uploadb.me/direct/5z0von41gi8o/S04E05 - Promised - Ehhhh.mkv.html",
                "https://uploadb.me/direct/bfxvyqc911on/S04E06 - What Might Have Been - Ehhhh.mkv.html",
                "https://uploadb.me/direct/5ko5ph480gyg/S04E07 - The Profit and the Loss - Ehhhh.mkv.html",
                "https://uploadb.me/direct/otug7sro39x4/S04E08 - Portage - Ehhhh.mkv.html",
                "https://uploadb.me/direct/fcks6rinhneu/S04E09 - Death All 'Round - Ehhhh.mkv.html",
                "https://uploadb.me/direct/fzss5nr39ahb/S04E10 - The Last Ship - Ehhhh.mkv.html",
                "https://uploadb.me/direct/eh519yg6c6sg/S04E11 - The Outsider - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/xp6wcf26vk8d/S04E12 - The Vision - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/0mia2j6vwq3p/S04E13 - Two Journeys - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/m3cjom80kujq/S04E14 - Vikings - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/wqzu6cs9vc2v/S04E15 - All His Angels - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/t8466mpynkk4/S04E16 - Crossings - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/930m1ouje4f6/S04E17 - The Great Army - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/oq6f5zvap46j/S04E18 - Revenge - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/30gqw71d1gsl/S04E19 - On the Eve - Ehhhh -.mkv.html",
                "https://uploadb.me/direct/vx094lno5xdi/S04E20 - The Reckoning - Ehhhh -.mkv.html"
            ],
            [
                "https://uploadb.me/direct/5n6k1wipwui8/Vikings S05E11 The Revelation 720p NF WEBRip x264 AAC- LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/25yaukfgt1l8/Vikings S05E12 Murder Most Foul 720p NF WEBRip x264 AAC- LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/ibwn2nhq5ugc/Vikings S05E13 A New God 720p NF WEBRip - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/qlkjsg7pgws9/Vikings S05E14 The Lost Moment 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/7qfb5j94jlmz/Vikings S05E15 Hell 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/2k0zdfz3k1jb/Vikings S05E16 The Buddha 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/zp352z6cb31y/Vikings S05E17 The Most Terrible Thing 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/mnc95ctfhjml/Vikings S05E18 Baldur 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/tnnecyotuxma/Vikings S05E19 What Happens in the Cave 720p NF WEBRipx264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/rgbsea7kd4wy/Vikings S05E20 Ragnarok 720p NF WEBRip x264 AAC - LOKiHD - Telly.mkv.html",
                "https://uploadb.me/direct/7s7eg033chyz/Vikings.S05E01.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/i0qfo7lbp7is/Vikings.S05E02.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/2by1fbkavbyl/Vikings.S05E03.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/lgcphc6ecryw/Vikings.S05E04.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/ef3lktnhib7m/Vikings.S05E05.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/t7i12m2p3pxw/Vikings.S05E06.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/67ajz593eahu/Vikings.S05E07.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/078413lvg5rw/Vikings.S05E08.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/vvzqtgt8s7tm/Vikings.S05E09.720p.BluRay.x265-HETeam.mkv.html",
                "https://uploadb.me/direct/4577eg9spjmb/Vikings.S05E10.720p.BluRay.x265-HETeam.mkv.html"
            ],
            [
                "https://uploadb.me/direct/2ut9cfmqtv6j/Vikings.S06E01.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/xw23ibyvzbnp/Vikings.S06E02.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/wuuljz5hhjbp/Vikings.S06E03.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/6vh1nlb5x7nv/Vikings.S06E04.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/ils09djxwq1l/Vikings.S06E05.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/hcsep5ny52kx/Vikings.S06E06.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/lunc3etod9dp/Vikings.S06E07.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/edxtqpmjck07/Vikings.S06E08.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/mtszdmct9qgb/Vikings.S06E09.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/mrpx70ghzw0k/Vikings.S06E10.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/8xpfy8rl9ror/Vikings.S06E11.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/mgcbkgqgzl2y/Vikings.S06E12.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/j0x0lyyywsv9/Vikings.S06E13.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/qvrjdbv4k2rp/Vikings.S06E14.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/x1oultmbdwtl/Vikings.S06E15.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/1kd54191gfpr/Vikings.S06E16.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/7y3i53u7gfzq/Vikings.S06E17.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/cz8kli0nae5t/Vikings.S06E18.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/nerlo3qbseg5/Vikings.S06E19.720p.WEBRip.x264-GalaxyTV.mkv.html",
                "https://uploadb.me/direct/tyg70llwmdxd/Vikings.S06E20.720p.WEBRip.x264-GalaxyTV.mkv.html"
            ]
        ];
        setMovie({ ...movie, [e.target.name]: JSON.stringify(value) });
        console.log(value);
    }

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + " % done.")
            },
                (err) => {
                    console.log(err);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        setMovie((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();

        upload(
            [
                { file: img, label: "img" },
                { file: imgTrailer, label: "imgTrailer" },
                { file: imgSm, label: "imgSm" },
                { file: imgMob, label: "imgMob" },
                { file: imgTrailerMob, label: "imgTrailerMob" },
            ]
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (img === null || imgSm === null) {
            alert("عکس ها را انتخاب نکرده اید!");
        } else {
            if (movie !== null) {
                if (movie.title === undefined || movie.desc === undefined || movie.year === undefined || movie.genre === undefined || movie.duration === undefined || movie.limit === undefined || movie.isSeries === undefined || movie.isPublish === undefined || movie.trailer === undefined || movie.video === undefined || movie.imdb === undefined || movie.directors === undefined || movie.writters === undefined || movie.stars === undefined || movie.boxOffice === undefined) {
                    alert("موردی را تکمیل نکرده اید!");
                } else {
                    createMovie(movie, img, imgTrailer, imgSm, imgMob, imgTrailerMob, dispatch);
                }
            } else {
                alert("لطفا موارد را تکمیل کنید!");
            }
        }
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input
                        type="file"
                        id="img"
                        name={"img"}
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Trailer image</label>
                    <input
                        type="file"
                        id="imgTriler"
                        name={"imgTriler"}
                        onChange={(e) => setImgTriler(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail image</label>
                    <input
                        type="file"
                        id="imgSm"
                        name={"imgSm"}
                        onChange={(e) => setImgSm(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Mobile image</label>
                    <input
                        type="file"
                        id="imgMob"
                        name={"imgMob"}
                        onChange={(e) => setImgMob(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Mobile trailer image</label>
                    <input
                        type="file"
                        id="imgTrailerMob"
                        name={"imgTrailerMob"}
                        onChange={(e) => setImgTrailerMob(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" placeholder="Title" name={"title"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" placeholder="Description" name={"desc"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input type="text" placeholder="Year" name={"year"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" placeholder="Genre" name={"genre"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input type="text" placeholder="Duration" name={"duration"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input type="text" placeholder="Limit" name={"limit"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>IMDB</label>
                    <input
                        type="text"
                        placeholder="Imdb"
                        name={"imdb"}
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Directors</label>
                    <input type="text" placeholder="Directors" name={"directors"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Writters</label>
                    <input type="text" placeholder="Writters" name={"writters"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Stars</label>
                    <input type="text" placeholder="Stars" name={"stars"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>BoxOffice</label>
                    <input type="text" placeholder="BoxOffice" name={"boxOffice"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Budget</label>
                    <input type="text" placeholder="Budget" name={"budget"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Language</label>
                    <input type="text" placeholder="Language" name={"language"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Country</label>
                    <input type="text" placeholder="Country" name={"country"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Is Series?</label>
                    <select defaultValue={"DEFAULT"} name="isSeries" id="isSeries" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>Yes or No</option>
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Is Publish?</label>
                    <select defaultValue={"DEFAULT"} name="isPublish" id="isPublish" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>Yes or No</option>
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                    <input
                        type="text"
                        name={"trailer"}
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input
                        type="text"
                        name={"video"}
                        onChange={handleSeriesChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Subtitle</label>
                    <input
                        type="text"
                        name={"sub"}
                        onChange={handleChange}
                    />
                </div>
                <button className="addProductButton" onClick={handleSubmit}>Create</button>
                {/* {
                    uploaded === 5
                        ? (
                            <button className="addProductButton" onClick={handleSubmit}>Create</button>
                        ) : (
                            <button className="addProductButton" onClick={handleUpload}>Upload</button>
                        )
                } */}
            </form>
        </div>
    );
}
