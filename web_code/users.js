const { application } = require("express");
const express = require("express");
const router = express.Router();

router.route("/login")
.get((req, res) => {
    res.send("<h1>This is the login screen for the user.</h1>");
});

module.exports = router;