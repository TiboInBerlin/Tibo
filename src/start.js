import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";

//I gonna some if statement is: check location.pathname

const welcome = <Welcome />;
const app = <App />;
ReactDOM.render(
    location.pathname === "/welcome" ? <Welcome /> : <App />,
    document.querySelector("main")
);
