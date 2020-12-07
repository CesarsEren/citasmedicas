//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");

router.post("/comprobarlogin", (req, res) => {
  var respuesta = {};
  const { usuario, password } = req.body;
  if (usuario == "admin" && password == "admin") {
    req.session.usuario = usuario;
    req.session.password = password;
    res.redirect("/tablero");
  } else {
    res.redirect("/?error=Usuario no encontrado");
  }
  res.send(respuesta);
});

//Exports
module.exports = router;
