import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import "./app.scss"
import Home from "./pages/Home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import MovieItem from "./pages/movieItem/MovieItem";
import Login from "./pages/login/Login";
import SearchEngin from "./pages/search/SearchEngin";
import Book from "./pages/book/Book";
import Test from "./components/Test";

//import { AuthContext } from "./context/authContext/AuthContext";

function App() {
    //const { user } = useContext(AuthContext);
    const user = true;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user ? <Home /> : <Redirect to={"/register"} />}
                </Route>
                <Route path="/register">
                    {!user ? <Register /> : <Redirect to={"/"} />}
                </Route>
                <Route path="/login">
                    {!user ? <Login /> : <Redirect to={"/"} />}
                </Route>
                {user && (
                    <>
                        <Route path="/movies">
                            <Home type={"movie"} />
                        </Route>
                        <Route path="/series">
                            <Home type={"series"} />
                        </Route>
                        <Route path="/watch">
                            <Watch />
                        </Route>
                        <Route path="/more/:title">
                            <MovieItem />
                        </Route>
                        <Route path="/search">
                            <SearchEngin />
                        </Route>
                        <Route path="/magazine">
                            <Book />
                        </Route>
                        <Route path="/test/:id">
                            <Test />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;