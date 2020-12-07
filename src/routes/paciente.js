//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");

router.get("/paciente.consulta", (req, res) => {
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  console.log(req.body);
  const { dni } = req.query;
  mysqlconecct.query(
    "SELECT * FROM paciente WHERE paciente_dni = ?",
    [dni],
    function (err, result) {
      if (result != null && err == null) {
        respuesta.data = result[0];
      } else {
        respuesta.status = "VACIO";
        respuesta.data = result[0];
      }
      res.send(respuesta);
    }
  );
});

router.get("/paciente.lista", (req, res) => {
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  console.log(req.body);
  const { dni } = req.query;

  var query = `SELECT pc.*,(if((SELECT COUNT(1) FROM seguimiento WHERE seguimiento_paciente_id = pc.paciente_id AND seguimiento_estado=1 )=1,
  'Con Seguimiento','Sin Seguimiento')) as seguimiento 
  FROM paciente pc ${dni != null ? `where pc.paciente_dni = ${dni}` : ""}`;
  mysqlconecct.query(query, [dni], function (err, result) {
    if (result != null && err == null) {
      respuesta.data = result;
    } else {
      respuesta.status = "VACIO";
      respuesta.data = result;
    }
    res.send(respuesta);
  });
});

//Exports
module.exports = router;
