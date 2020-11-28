//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");
var respuesta;
router.post("/seguimiento.registro", (req, res) => {
  console.log("INGRESO");
  var paciente_id;
  const {
    dni,
    nombre,
    paterno,
    materno,
    direccion,
    whatsaap,
    fechainicio,
    fechafin,
  } = req.body;
  mysqlconecct.query(`call usp_`, [], function (err, result) {



  });
  res.send(respuesta);
});

router.get("seguimiento.consulta", (req, res) => {
  /*
    - query
    - body 
    - params
    */
  /*const {  } = req.params; 
    mysqlconecct.query("insert into Usuario(nombres,apepaterno,apematerno,correo,password) values(?,?,?,?,?)",
      [nombres, paterno, materno, correo, pass],*/
});
//Exports
module.exports = router;
