import React, { Component } from 'react';
import { ArrowBackOutlined, Search } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import axios from "axios";

import "./searchEngin.scss";
import imdb from "../../image/imdb.png";
import SearchItem from '../../components/searchItem/SearchItem';
import MovieItem from "../../pages/movieItem/MovieItem";

function CheckBox({ name, value, tick, onCheck }) {
    return (
        <p>
            {value}
            <input
                className={"checkBox"}
                name={name}
                type="checkbox"
                value={value}
                checked={tick || false}
                onChange={onCheck}
            />
        </p>
    );
}
function CheckBoxList({ options, isCheckedAll, onCheck }) {
    const checkBoxOptions = (
        <div className="checkbox-list">
            {options.map((option, index) => {
                return (
                    <CheckBox key={index} name={option.name} value={option.value} tick={option.checked} onCheck={(e) => onCheck(option.value, e.target.checked)} />
                );
            })}
        </div>
    );
    return (
        <div className="checkbox-list">
            <p>
                انتخاب همه
                <input
                    className={"checkBox"}
                    name={"select-all"}
                    type="checkbox"
                    value={"ALL"}
                    checked={isCheckedAll}
                    onChange={(e) => onCheck('all', e.target.checked)}
                />
            </p>
            {checkBoxOptions}
        </div>
    );
}

const GoBack = () => {
    const history = useHistory();

    return (
        <div className={"back"} onClick={() => history.goBack()}>
            <ArrowBackOutlined className={"icon"} />
            بازگشت
        </div>
    )
}

class SearchEngin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isScrolled: false,
            yearValue: { min: 2017, max: 2021 },
            rateValue: { min: 0, max: 10 },
            isSelectedAll: true,
            titleList: [
                {
                    name: "title",
                    value: "نام فیلم یا سریال",
                    checked: true,
                },
                {
                    name: "title",
                    value: "نام بازیگر",
                    checked: false,
                },
                {
                    name: "title",
                    value: "نام کارگردان",
                    checked: false,
                },
            ],
            checkList: [
                {
                    name: "genre",
                    value: "اکشن",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "جنایی",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "کمدی",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "درام",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "ترسناک",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "دلهره آور",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "غلمی تخیلی",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "رازآلود",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "عاشقانه",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "ماجراجویی",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "فانتزی",
                    checked: true,
                },
                {
                    name: "genre",
                    value: "انیمیشن",
                    checked: true,
                },
            ],
            data: [],
            isSeries: false,
            titleType: "1",
            searchText: "",
            filter: false,

            isOpen: false,
            haveText: "",

            status: 0,

            movieItem: false,
            movie: null,
            isLand: null,
        };
    }

    componentDidMount() {
        //this.getRandomLists();
        if (window.innerWidth > window.innerHeight) {
            this.setState({ isLand: true });
        } else if (window.innerWidth < window.innerHeight) {
            this.setState({ isLand: false });
        }
    }

    getRandomLists = async () => {
        try {
            const res = await axios.get("/movies");
            this.setState({ data: res.data });
        } catch (err) {
            console.log(err);
        }
    };

    onRadioChange = (e) => {
        this.setState({ titleType: e.target.value });
        if (e.target.value === "4") {
            this.setState({ filter: true });
        } else {
            this.setState({ filter: false });
        }
    }

    onSwitchChange = () => {
        this.setState({ isSeries: !this.state.isSeries });
    }

    onCheckBoxChange(checkName, isSelected) {
        let isAllChecked = (checkName === 'all' && isSelected);
        let isAllUnChecked = (checkName === 'all' && !isSelected);
        const checked = isSelected;

        const checkList = this.state.checkList.map((color, index) => {
            if (isAllChecked || color.value === checkName) {
                return Object.assign({}, color, {
                    checked,
                });
            } else if (isAllUnChecked) {
                return Object.assign({}, color, {
                    checked: false,
                });
            }

            return color;
        });

        let isCheckedAll = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

        this.setState({
            checkList,
            isSelectedAll: isCheckedAll,
        });
    }

    onSubmitTitle = (e) => {
        if (e.key === 'Enter') {
            this.startSearch(e.target.value);
        }

    }

    startSearch = async (searchText) => {
        // for (let i = 0; i <= this.state.checkList.length - 1; i++) {
        //     if (this.state.checkList[i].checked === true) {
        //         console.log(this.state.checkList[i].value);
        //     }
        // }
        const { titleType, isSeries } = this.state;
        try {
            const res = await axios.post("/movies/search", {
                titleType: titleType,
                searchText: searchText,
                isSeries: isSeries,
            });
            this.setState({ data: res.data });
        } catch (err) {
            console.log(err);
        }
    }
    filterSearch = async () => {
        const { titleType, isSeries, checkList, rateValue, yearValue } = this.state;

        let genreList = [];
        for (let i = 0; i < checkList.length; i++) {
            if (checkList[i].checked === true) {
                genreList.push(checkList[i].value);
            }
        }

        try {
            const res = await axios.post("/movies/search", {
                titleType: titleType,
                isSeries: isSeries,
                genre: genreList,
                minImdb: rateValue.min,
                maxImdb: rateValue.max,
                minYear: yearValue.min,
                maxYear: yearValue.max,
            });
            this.setState({ data: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        window.onscroll = () => {
            this.setState({ isrolled: window.pageYOffset > 0 });
            return () => (window.onscroll = null);
        }

        const gotoMovieItem = (value, movieValue) => {
            this.setState({ movieItem: value, movie: movieValue });
        }

        //console.log(this.state.titleList);
        const { filter } = this.state;

        const filterClass = filter ? 'primary' : 'secondary';
        const searchClass = filter ? "secondary" : "primary";

        const { movieItem, movie, isLand } = this.state;

        return (
            <div className={"searchContainer"}>
                <div style={{ display: movieItem && "none" }} className={this.state.isScrolled ? "navbarSearch scrolled" : "navbarSearch"}>
                    <div className={"container"}>
                        <div className={"left"}>
                            <GoBack />
                        </div>
                        <div className={"right"}>
                            <div className={`searchBox searchBox-${searchClass}`} style={{ backgroundColor: filter ? "green" : "#fff" }}>
                                {!filter ?
                                    <input placeholder={"لطفا نام را به انکلیسی وارد کنید"} onKeyDown={this.onSubmitTitle} />
                                    :
                                    <div className={"searchBtn"} type={"button"} onClick={this.filterSearch}>جستجو</div>
                                }
                                <Search className={"icon"} style={{ color: filter ? "#fff" : "#000" }} />
                            </div>
                            <h1 style={{ textAlign: "right", ontSize: "45px", color: "red", fontFamily: "sign" }}>Netphoenix</h1>
                        </div>
                    </div>
                </div>
                <div style={{ display: movieItem && "none" }} className={"searchPart"}>
                    <div className={"searchContent"}>
                        {this.state.data.map(function (item, index) {
                            return (
                                <SearchItem i={index} item={item} goto={gotoMovieItem} key={index} />
                            );
                        })}
                    </div>
                    <div className={"searchMenu"}>

                        <div className={"switchContainer"}>
                            <label style={{ color: !this.state.isSeries ? "red" : "rgb(133, 133, 133)" }}>فیلم</label>
                            <input
                                className="react-switch-checkbox"
                                id={`react-switch-new`}
                                type="checkbox"
                                onChange={this.onSwitchChange}
                            />
                            <label
                                className="react-switch-label"
                                htmlFor={`react-switch-new`}
                            >
                                <span className={`react-switch-button`} />
                            </label>
                            <label style={{ color: this.state.isSeries ? "blue" : "rgb(133, 133, 133)", marginLeft: "25px" }}>سریال</label>
                        </div>

                        <div className={"seperator"} />

                        <label>جستجو بر اساس</label>

                        <p>
                            نام فیلم
                            <input className={"radio"} type="radio" value={"1"} name={"name"} checked={this.state.titleType === "1"} onChange={this.onRadioChange} />
                        </p>
                        <p>
                            نام بازیکر
                            <input className={"radio"} type="radio" value={"2"} name={"name"} checked={this.state.titleType === "2"} onChange={this.onRadioChange} />
                        </p>
                        <p>
                            نام کارگردان
                            <input className={"radio"} type="radio" value={"3"} name={"name"} checked={this.state.titleType === "3"} onChange={this.onRadioChange} />
                        </p>
                        <p>
                            فیلترها
                            <input className={"radio"} type="radio" value={"4"} name={"name"} checked={this.state.titleType === "4"} onChange={this.onRadioChange} />
                        </p>

                        <div className={`filterContainer filterContainer-${filterClass}`}>
                            <div className={"seperator"} />
                            <label>ژانر</label>
                            <div className={"genreContainer"}>
                                <CheckBoxList options={this.state.checkList} isCheckedAll={this.state.isSelectedAll} onCheck={this.onCheckBoxChange.bind(this)} />
                            </div>

                            <div className={"seperator"} />

                            <div className={"inputRContainer"}>
                                <label className={"yearLabel"}>سال انتشار</label>
                                <InputRange
                                    maxValue={2021}
                                    minValue={2017}
                                    value={this.state.yearValue}
                                    onChange={(value) => this.setState({ yearValue: value })}
                                />
                            </div>

                            <div className={"seperator"} />

                            <div className={"inputRContainer"}>
                                <label>imdb امتیاز</label>
                                <img src={imdb} alt={""} />
                                <InputRange
                                    maxValue={10}
                                    minValue={0}
                                    value={this.state.rateValue}
                                    onChange={(value) => this.setState({ rateValue: value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {movieItem && <MovieItem search={gotoMovieItem} movie={movie} />}
            </div>
        );
    }
}

export default SearchEngin;