const knox = require("knox");
const fs = require("fs");

if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

//we create a client to give it information that we want to transfer to aws.
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "spicedling"
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.json({
            error: true
        });
    }
    //this is my header: we use in order to send the data into stream.
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size, //size is important because aamzon will know that the file (that is a sum of chunks) is fully downloaded!
        "x-amz-acl": "public-read"
    });
    const readStream = fs.createReadStream(req.file.path);
    //here above, it will take the file, split it into chunk and send it to the server
    readStream.pipe(s3Request); //for each stream I have to pipe it and append the header (s3request) to the data.
//If the server eceives the data correctly, it will send a response!
    s3Request.on("response", s3Response => {

        if (s3Response.statusCode == 200) {
            next();
            //when I upload my image, I do not need it in my uploads folder and, therefore, I delete it (fs.unlink)
            fs.unlink(req.file.path, () => {});
        } else {
            return res.json({
                error: true
            });
        }
    });
};
