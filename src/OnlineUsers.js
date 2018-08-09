import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OnlineUsers extends React.Component {
    componentDidMount() {
    }
    render() {
        const { onlineUsers } = this.props;
        if (!onlineUsers) {
            return null;
        }

        const onlineUsersDiv = (
            <div>
                <h1>Who Is Online Right Now?</h1>
                <div className="online-users">
                    {onlineUsers.map(user => (
                        <div key={user.id} className="friend">
                            <img className="online-user-pic" src={user.image_url || '/images/default.png'} />
                            <div>Name: {user.first_name} {user.last_name}</div>
                        </div>
                    ))}
                </div>
                <div className="link">

                <Link to="/friends" className="friendslink">Friends and friends requests</Link>

                <Link to="/chat" className="chatlink">Start chat with all users online!</Link>

                <Link to="/profile" className="profilelink">Go back to your profile</Link>

                <a href="/logout">Logout</a>
            </div>
            </div>
        );

        return (
            <div id="online-users-div">
                {!onlineUsers.length && <div>Nobody is Online!</div>}
                {!!onlineUsers.length && onlineUsersDiv}
            </div>
        );
    }
}
export default connect(state => {
    return {
        onlineUsers: state.onlineUsers
    };
})(OnlineUsers);
