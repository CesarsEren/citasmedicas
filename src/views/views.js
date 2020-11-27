//Imports
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/seguimiento", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/seguimiento.html"));
});
router.get("/seguimiento.detalle", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/seguimiento_detalle.html"));
});
router.get("/pacientes", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/pacientes.html"));
});

//Exports
module.exports = router;
