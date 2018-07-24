const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    )
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post('/registration', (req, res) => {
    console.log("inside POST/registration", req.body); //we have to set here bodyparser so that re.bod will not be undefined!
    //TO DO TIBO: db.query('INSERT INTO...'): we need to creat all the files with functions in it, create these functions and export them!
//we need to create db.js and all the sql tables!
// if we had an error...
/*res.json({
    error: 'duplicate email'
})*/
})

//this shit here should be always last: just do it!
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
