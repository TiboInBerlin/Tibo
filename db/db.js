const spicedPg = require("spiced-pg");
let db;

if(process.env.DATABASE_URL){
    db = spicedPg(process.env.DATABASE_URL)
}else{
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
