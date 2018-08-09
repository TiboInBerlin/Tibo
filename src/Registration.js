import React, {Component} from "react";
import axios from './axios';
import { Link } from 'react-router-dom';
import App from './App';

class Registration extends Component { //inherits properties of Component
    constructor(props) {
        super(props);
        this.state = {isLoggedIn : null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('/registration', this.state).then((results)=>{
            if (results.data.success) {
                console.log(results.data.success);
                this.setState({isloggedIn : true});
                location.replace('/profile');

            }else {
                this.setState({isloggedIn : false});

            }
        });

    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <App />
            );
        }
        return (
            <div id="registration">
                <form onSubmit={this.handleSubmit}>
                    <label> First Name:
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={this.handleChange}
                        />
                    </label> <br></br> <br></br>
                    <label> Last Name:
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                        />
                    </label> <br></br> <br></br>
                    <label> E-Mail:
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            onChange={this.handleChange}
                        />
                    </label> <br></br> <br></br>
                    <label> Password:
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="submit"/>
                </form>
                <div className="link">
                <Link to="/login" className="linklogin">Click here to Log in!</Link>
            </div>
            </div>
        );
    }
    // }

}

export default Registration;
