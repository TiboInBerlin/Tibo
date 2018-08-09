import React from "react";
import axios from "./axios";

function Uploader({ setImage }) {
    var fileName, imageFile;

    function imageSelected(e) {
        imageFile = e.target.files[0];
        fileName = imageFile.name;
    }

    function upload() {
        var formData = new FormData();
        formData.append("file", imageFile);
        axios.post("/upload", formData).then(function(res) {
            console.log(res.data);
            setImage(res.data.imageUrl);
        });
    }

    return (
        <div>
            <br></br>
            <label id="file-label" htmlFor="file-field">
                        Select your image:
                    </label>
            <input type="file" id="file-field" onChange={imageSelected}/>
            <button className="upload-button" onClick={upload}>
                upload!
            </button>
        </div>
    );
}

export default Uploader;
