import React, {Component} from "react";

class Logo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

    }
    render() {
        return (
            <div className="mainlogo">
            <img src="./mainlogo.jpg" alt="logo"/>
        </div>
        );
    }

}

export default Logo;
