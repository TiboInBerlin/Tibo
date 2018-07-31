import React, { Component } from "react";
import axios from "./axios";

class Logo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        axios.get("/logout").then(() => {
            super.setState({ isLoggedIn: false });
            location.replace("/welcome");
        });
    }
    render() {
        return (
            <div className="mainlogo">
                <img src="./mainlogo.jpg" alt="logo" />
                <button type="button" onClick={this.handleClick}>
                    Log out
                </button>
            </div>
        );
    }
}

export default Logo;
