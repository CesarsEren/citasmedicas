//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");

router.post("/seguimiento.registro", (req, res) => {
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  const {
    dni,
    nombre,
    paterno,
    materno,
    direccion,
    whatsapp,
    fechainicio,
    fechafin,
    equipo_id,
  } = req.body;
  mysqlconecct.query(
    `call usp_registro_seguimiento (?,?,?,?,?,?,?,?,?)`,
    [
      dni,
      nombre,
      paterno,
      materno,
      direccion,
      whatsapp,
      fechainicio,
      fechafin,
      equipo_id,
    ],
    function (err, result) {
      if (err == null && result != null) {
        respuesta = result[0][0];
        console.log(respuesta);
      } else {
        respuesta.status = "ERROR";
        respuesta.msg = err;
      }
      res.send(respuesta);
    }
  );
});

router.get("/seguimiento.consulta", (req, res) => {
  console.log("XXX");
  const { todos, dni } = req.query;
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  mysqlconecct.query(
    `call usp_get_seguimiento (?,?)`,
    [todos, dni],
    function (err, result) {
      if (err == null) {
        console.log(result[0]);
        respuesta.data = result[0];
        res.send(respuesta);
      }
    }
  );
});

router.get("/seguimiento.consulta.historial", (req, res) => {
  console.log("XXX");
  const { dni } = req.query;
  var respuesta = {
    msg: "consulta realizada con éxito",
    status: "SUCCESS",
    data: [],
  };
  mysqlconecct.query(
    `SELECT equipo_codigo,seguimiento_fecha_inicio,seguimiento_fecha_fin,CONCAT('Seguimiento ',seguimiento_id) AS detalle FROM seguimiento seg INNER JOIN equipo eqp 
    ON seg .seguimiento_equipo_id =  eqp.equipo_id
    WHERE seguimiento_dni  = ? AND seguimiento_estado = 0`,
    [dni],
    function (err, result) {
      if (err == null) {
        //console.log(result[0]);
        respuesta.data = result;
        res.send(respuesta);
      }
    }
  );
});

//Exports
module.exports = router;
