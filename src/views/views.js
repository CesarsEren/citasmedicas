//Imports
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'))
  //res.redirect("login");
});

/*router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});*/


//Exports
module.exports = router;
