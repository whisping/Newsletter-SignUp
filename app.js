//jshint esversion: 6

const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Server is running on port 3000. Bugaga.");
});

app.get("/", function(req, res) {
    console.log("some log");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;
    console.log(firstName + " " + lastName + " " + email);
});
