//Imports
const express = require("express");
const router = express.Router();
const mysqlconecct = require("../database");
const Request = require("request");

router.get("/ubidots.generartoken", (req, res) => {
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

router.get("/ubidots.gettemperatura", (req, res) => {
  const { equipo, token } = req.query;
  //var token = req.session.token;
  Request.get(
    {
      headers: {
        "x-auth-token": token, //req.session.token,
      },
      url:
        "https://industrial.api.ubidots.com/api/v1.6/variables/5fd6430173efc3201eb59ca5/values", //temperatura
    },
    (error, response, body) => {
      var temps = JSON.parse(response.body).results;
      var res1 = [];
      //res.send(temps);
      for (var tem of temps) {
        if (tem.context.CODE_UNICO === equipo) {
          res1.push(tem);
        }
      }
      Request.get(
        {
          headers: {
            "x-auth-token": token,
          },
          url:
            "https://industrial.api.ubidots.com/api/v1.6/variables/5fd643004763e71066f84ce7/values", //frecuencia
        },
        (error, response, body) => {
          var frecuencias = JSON.parse(response.body).results;
          var res2 = [];

          for (var frecuencia of frecuencias) {
            if (frecuencia.context.CODE_UNICO === equipo) {
              res2.push(frecuencia);
            }
          }

          //respuesta.push(res2);
          Request.get(
            {
              headers: {
                "x-auth-token": token,
              },
              url:
                "https://industrial.api.ubidots.com/api/v1.6/variables/5fd643004763e70b3e2d0aa0/values", //saturación
            },
            (error, response, body) => {
              var saturaciones = JSON.parse(response.body).results;
              var res3 = [];
              for (var saturacion of saturaciones) {
                if (saturacion.context.CODE_UNICO === equipo) {
                  res3.push(saturacion);
                }
              }

              var respuestafinal = [];

              for (var i = 0; i < res1.length; i++) {
                var row = {
                  timestamp: res1[i].timestamp,
                  temperatura: res1[i].value,
                  saturacion: res3[i].value,
                  frecuencia: res2[i].value,
                  estado: "",
                };
                if (row.temperatura >= 35 && row.temperatura <= 37.5) {
                  row.estado += "Temperatura Normal | ";
                } else if (row.temperatura >= 37.5 && row.temperatura <= 37.9) {
                  row.estado += "Temperatura Riesgosa | ";
                } else if (row.temperatura >= 38 && row.temperatura <= 45) {
                  row.estado += "Temperatura Alarmante | ";
                }

                if (row.frecuencia >= 60 && row.frecuencia <= 100) {
                  row.estado += "BPM Normal | ";
                } else if (row.frecuencia >= 40 && row.frecuencia <= 60) {
                  row.estado += "BPM Riesgosa | ";
                } else if (row.frecuencia >= 100 && row.frecuencia <= 160) {
                  row.estado += "BPM Alarmante | ";
                }

                row.estado += "Oxigenación Normal";
                if (row.saturacion >= 95 && row.saturacion <= 100) {
                  row.estado += "Oxigenación Normal";
                } else if (row.saturacion >= 90 && row.saturacion <= 94) {
                  row.estado += "Oxigenación Riesgosa";
                } else if (row.saturacion >= 80 && row.saturacion <= 89) {
                  row.estado += "Oxigenación Alarmante";
                }

                respuestafinal.push(row);
              }
              res.send(respuestafinal);
            }
          );
        }
      );
    }
  );
});

//Exports
module.exports = router;
