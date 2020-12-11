//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");

router.get("/equipos.disponibles", (req, res) => {
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  console.log(req.body);
  //const {} = req.body;
  mysqlconecct.query(
    `call usp_get_equipos_disponibles ()`,
    [],
    function (err, result) {
      if (err == null) {
        if (result[0].length > 0) {
          respuesta.status = "SUCCESS";
          respuesta.data = result[0];
        } else {
          respuesta.status = "VACIO";
          respuesta.data = result[0];
        }
        res.send(respuesta);
      }
    }
  );
});

//Exports
module.exports = router;
