import {useEffect, useMemo, useState} from "react";
import axios from "axios";

import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
    const MONTHS = useMemo(() => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],[]
    );

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("/users/stats", {
                    headers: {
                        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWQzZGIwMGYzYmRhMWZiODk3MWNiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTUwNzA0NiwiZXhwIjoxNjI5OTM5MDQ2fQ.8w5wIjTGLYGHoVCnWCx8wc-J-VAKHmu1EAngL9MxyFo"
                    }
                });
                const  statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                })
                res.data.map((item) => setUserStats((prev) => [...prev, {name: MONTHS[item._id - 1], "New User": item.total}]));
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    );
}
