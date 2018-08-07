import axios from './axios';

export async function receiveFriendsWannabes() {
    const results  = await axios.get('/friends-wannabes');
    return {
        type                    :   'RECEIVE_USER_FRIENDS_AND_WANNABES',
        userFriendsAndWannabes  :   results.data.userFriendsAndWannabes
    };
}
