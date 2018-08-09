import React from "react";

function ProfilePic({ image, first, last, clickHandler }) {
    return (
        <div className="profilepic-container">
            <div>
                {" "}
                <img className="profilepic" src={image} />
                <button onClick={clickHandler}>Upload new image</button>
            </div>
        </div>
    );
}

export default ProfilePic;
