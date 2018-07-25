import React from "react";
import Registration from "./Registration";
import Logo from "./Logo";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div className="big-momma-component">
            <h1> Welcome </h1>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
