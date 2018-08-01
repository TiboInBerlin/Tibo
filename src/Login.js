import React, { Component } from "react";
//we do not need to import react dom because qwe did it in sart.js
import axios from "./axios";
import App from "./App";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        //console.log("ho!");
        //setState is asynchronous and we can therefore pass it a callback!
        //Review ES& dynamic properties!!!!!
        //hereunder, syntax to dynamically set a key:
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log(this.state);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //console.log("Running handleSubmit", this.state);

        axios.post("/login", this.state).then(results => {
            if (results.data.success) {
                this.setState({ isloggedIn: true });
                location.replace("/profile");
            } else {
                super.setState({ isloggedIn: false });
                //console.log(results.data.message);
            }
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return <App />;
        } else {
            //never forget to return otherwise it will break down!
            return (
                <div className="login">
                    <h1>Login to fight against ignorance!</h1>

                    {this.state.error ? (
                        <div>ERROR: {this.state.error}</div>
                    ) : null}

                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="email"
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            );
        }
    }
}

export default Login; //never use curly brackets when you use export default!
