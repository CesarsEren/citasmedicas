//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");
const Request = require("request");
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

router.get("/prueba", (req, res) => {
  Request.post(
    {
      headers: {
        "x-ubidots-apikey": "BBFF-d0f788863647089efd6ea82066391dfd794",
      },
      url: "https://industrial.api.ubidots.com/api/v1.6/auth/token/",
    },
    (error, response, body) => {
      req.session.token = JSON.parse(response.body).token;
      res.send(JSON.parse(response.body));
    }
  );
});

router.get("/temperatura", (req, res) => {
  var token = req.session.token;
  console.log(token);
  Request.get(
    {
      headers: {
        "X-Auth-Token": req.session.token,
      },
      url:
        "https://industrial.api.ubidots.com/api/v1.6/variables/5fc9c2010ff4c372920d27a4/values",
    },
    (error, response, body) => {
      res.send(response);
    }
  );
});

//Exports
module.exports = router;
