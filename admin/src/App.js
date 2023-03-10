import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import MovieLists from "./pages/movieLists/MovieLists";
import {useContext} from "react";
import {AuthContext} from "./context/authContext/AuthContext";

import ImgTest from "./pages/imgTest/ImgTest";

function App() {
    //const {user} = useContext(AuthContext);
    const user = true;
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    {user ? <Redirect to={"/"}/> : <Login/>}
                    <Login/>
                </Route>
                {user ?
                    <>
                        {/* <Topbar/> */}
                        <div className="container">
                            <Sidebar/>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="/users">
                                <UserList/>
                            </Route>
                            <Route path="/user/:userId">
                                <User/>
                            </Route>
                            <Route path="/newUser">
                                <NewUser/>
                            </Route>
                            <Route path="/movies">
                                <ProductList/>
                            </Route>
                            <Route path="/product/:productId">
                                <Product/>
                            </Route>
                            <Route path="/newproduct">
                                <NewProduct/>
                            </Route>
                            <Route path="/lists">
                                <MovieLists/>
                            </Route>
                            <Route path="/test">
                                <ImgTest/>
                            </Route>
                        </div>
                    </>
                    :
                    <Redirect to={"/login"}/>
                }
            </Switch>
        </Router>
    );
}

export default App;
