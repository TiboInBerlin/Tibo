const spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(
        "postgres:thibautvalarche:postgres@localhost:5432/socialnetwork"
    );
}

//we create this function in order to add the hashed password and other data to our users.sql table
exports.createUser = function(firstName, lastName, email, password) {
    const q = `
INSERT INTO users (first_name, last_name, email, hashed_password)
VALUES($1, $2, $3, $4) RETURNING *
`;
    const params = [firstName, lastName, email, password];

    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getUserInfoById = function(userId) {
    const q = "SELECT * FROM users WHERE id = $1;"; //$1 prevents against sql injections and refers to the first parameter in the arra params.
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.checkEmail = function(email) {
    const q = "SELECT * FROM users WHERE email = $1;";
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.updateUserProfilePic = function(userId , imageUrl) {
    const q =
    "UPDATE users SET image_url = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , imageUrl];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateUserBio = function(userId, bio) {
    const q =
    "UPDATE users SET bio = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , bio];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getFriendshipStatusById = function(userId) {
    const q = "SELECT * FROM friendships WHERE (receiver_id = $1);";
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getFriendshipStatus = function(senderId, receiverId) {
    const q = "SELECT * FROM friendships WHERE ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) RETURNING *;";
    const params = [senderId, receiverId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.setFriendshipStatus = function(senderId, receiverId , status) {
    const q = "UPDATE friendships SET status = $3 WHERE ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) RETURNING *;";
    const params = [senderId, receiverId, status];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};
