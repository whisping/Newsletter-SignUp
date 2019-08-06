//jshint esversion: 6

const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000 and maybe on Heroku. Bugaga.");
});

app.get("/", function(req, res) {
    console.log("starting page");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
    console.log("failure restart");
    res.redirect("/");
});

app.post("/", function(req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;

    function success() {
        console.log("success");
        res.sendFile(__dirname + "/success.html");
    }

    function fail() {
        console.log("failure");
        res.sendFile(__dirname + "/failure.html");
    }

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/91e0ed23fa",
        method: "POST",
        headers: {
            "Authorization": "nikolai1 1101b1c7153e8d9c7a5254601599e6df-us20"
        },
        body: jsonData,
    };

    request(options, function(error, responce, body) {
        if (error) {
            console.log(error);
            fail();
        } else {
            console.log(responce.statusCode);
            if (responce.statusCode == 200) {
                success();
            } else {
                fail();
            }
        }
    });

    console.log("DATA: " + firstName + " " + lastName + " " + email);
});



// 1101b1c7153e8d9c7a5254601599e6df-us20
// 91e0ed23fa
