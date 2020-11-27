/* cada Js actua como si fuera una clase y para poder ser 
instanciada debe ser permitir su exportación con
 module.exports = router
 que comparte las rutas de los webservices a desarrollar */

//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");

router.post("/equipos.disponibles", (req, res) => {
  console.log(req.body);
  /*const { nombres, paterno, materno, correo, pass } = req.body; 
  mysqlconecct.query("insert into Usuario(nombres,apepaterno,apematerno,correo,password) values(?,?,?,?,?)",
    [nombres, paterno, materno, correo, pass],
    function (err, result) {
      //respuesta.datos = result;
      console.log("result", result);
      console.log("err", err);
      var mensaje = "Usuario Registrado";
    }
  );*/
});

router.get("equipos.consulta", (req, res) => {
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
