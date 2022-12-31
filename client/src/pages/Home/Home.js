import './home.scss';
import List from "../../components/list/List";
import NavbarFeature from "../../components/navbar/NavbarFeature"

import React, { useEffect, useState } from "react";
import axios from "axios";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Home({ type }) {
    const [lists, setLists] = useState([]);
    const [movieItem, setMovieItem] = useState(false);
    const [sendData, setSendData] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.post("movies/lists");
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();

        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <FadeIn>
            <div className={"home"}>
                {/* <Navbar /> */}
                <div className={"featureContainer"}>
                    <NavbarFeature type={type} movieItem={movieItem} setMovieItem={setMovieItem} sendData={sendData} setSendData={setSendData} />
                </div>
                {lists.map((list, index) => (
                    <List list={list} key={index} movieItem={movieItem} setMovieItem={setMovieItem} setSendData={setSendData} />
                ))}
            </div>
        </FadeIn>
    );
}