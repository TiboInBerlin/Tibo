import React, { Component } from "react"
//we do not need to import react dom because qwe did it in sart.js
import axios from "axios"

class Registration extends Component {
    constructor() {
        super()

        this.state = {
            error: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        //console.log("ho!");
        //SetState is asynchronous and we can therefore pass it a callback!
        //Review ES& dynamic properties!!!!!
        this.setState({
                //syntax to dynamically set a key:
                [e.target.name]: e.target.value
            })
    }

    handleSubmit(e) {
        e.preventDefault()

        //console.log("Running handleSubmit", this.state);

        axios.post("/registration", this.state)
            .then(resp => {
                if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                })
            } else {
                location.replace('/')
            }
        })
    }

    render() {
        //never forget to return otherwise it will break down!
        return (
            <div className="registration">
                <h1>Registration for cRazy Peeps!</h1>

                {
                    this.state.error
                        ? <div>ERROR: { this.state.error }</div>
                        : null
                }

                <form onSubmit={ this.handleSubmit }>
                    <input
                        onChange={this.handleChange}
                        name="fullName"
                        placeholder="name"
                        type="text"
                    />
                    <input
                        onChange={this.handleChange}
                        name="dog"
                        placeholder="dog"
                        type="text"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Registration; //never use curly brackets when you use export default!
