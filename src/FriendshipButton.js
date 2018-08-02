import React from "react";
import axios from "./axios";

class FriendshipButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.friend = this.friend.bind(this);
    }

    componentDidMount() {
        if (this.props.status == 1) {
            //console.log(this.props.status);
            this.setState({
                senderId: this.props.otherUserId,
                receiverId: this.props.loggedInUserId,
                status: this.props.status,
                buttonText: "Accept request"
            });
        } else if (this.props.status == 2) {
            console.log(this.props.status);
            this.setState({
                senderId: this.props.senderId,
                status: this.props.status,
                buttonText: "cancel request"
            });
        }
    }

    friend() {
        if (this.state.status == 1) {
            axios
                .post("/accept-request", {
                    senderId: this.state.senderId,
                    receiverId: this.state.receiverId,
                    status: 2
                })
                .then(results => {
                    console.log(results);
                    this.props.setFriendshipStatus(2);
                    this.setState({
                        status: 2,
                        buttonText: "Delete Friendship"
                    });
                });
        } else if (this.state.status == 2) {
            axios
                .post("/delete-friendship", {
                    senderId: this.state.senderId,
                    receiverId: this.state.receiverId
                })
                .then(results => {
                    this.props.setFriendshipStatus(1);
                    this.setState({
                        status: 1,
                        buttonText: "Add Friend"
                    });
                });
        }
    }

    render() {
        return (
            <div>
                <button className="friendship-button" onClick={this.friend}>
                    accept request
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}

export default FriendshipButton;
