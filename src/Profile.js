import React, { Component } from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import { Link } from 'react-router-dom';
//import axios from "./axios";
//import FriendshipButton from "./FriendshipButton";

class Profile extends Component {
    constructor(props) {
        super(props);
        var textArea = "";
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {});
    }


    render() {
        const {
            firstName,
            lastName,
            userId,
            profilePic,
            uploaderIsVisible,
            userBio,
            showBio,
            toggleShowBio,
            showUploader,
            setImage,
            setBio
        } = this.props;
        return (
            <div id="profile">
                <h1> {firstName}'s Profile </h1>
                <ProfilePic
                    image={profilePic}
                    first={firstName}
                    last={lastName}
                    clickHandler={showUploader}
                />
            <br></br>
                {uploaderIsVisible && <Uploader setImage={setImage} />}
                <br></br>

                {showBio ? (
                    <form onSubmit={() => setBio(this.state.bioText)}>
                        <textarea name="bioText" onChange={this.handleChange} />
                        {""}
                        <input type="submit" value="submit" />
                    </form>
                ) : (
                    <p onClick={toggleShowBio}>Click to add stuff about yourself</p>
                )}
                {userBio && <p>{firstName}'s' Biography: {userBio}</p>}

            <br></br>
            <Link to="/friends" className="friendslink">Friends and friends requests</Link>
            <br></br>
            <Link to="/online" className="onlinelink">See who is online!</Link>
            <br></br>
            <Link to="/chat" className="chatlink">Start chat with all users online!</Link>
            <br></br>
            <a href="/logout">Logout</a>
            </div>
        );
    }
}

export default Profile;
