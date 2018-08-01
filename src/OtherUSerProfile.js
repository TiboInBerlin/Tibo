import React, { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./FriendshipButton";

class OtherUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id + ".json")
            .then(results => {
                if (results.data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        userId: results.data.id,
                        firstName: results.data.first_name,
                        lastName: results.data.last_name,
                        bio: results.data.bio,
                        profilePic: results.data.image_url || "default.jpg",
                        createdAt: results.data.created_at
                    });
                }
            })
            .then(() => {
                axios
                    .get("/user-friendship/:" + this.state.userId + ".json")
                    .then(resp => {
                        if (resp.data.results == 0) {
                            this.setState({
                                friendshipStatus: 0
                            });
                        } else {
                            console.log(resp.data);
                            this.setState({
                                friendshipStatus: resp.data.status,
                                senderId: resp.data.sender_id
                            });
                        }
                    });
            });
    }

    render() {
        return (
            <div id="other-user-profile">
                <h1>
                    Profile of {this.state.firstName}, {this.state.lastName}
                </h1>
                <img src={this.state.profilePic} alt=" Profile Pic" />
                <p>{this.state.bio}</p>
            </div>
        );
    }
}

export default OtherUserProfile;
