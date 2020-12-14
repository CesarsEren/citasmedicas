const express = require("express");
const session = require("express-session");

const app = express();
const path = require("path");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Seguimiento",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes Server
app.use(require("./routes/ubidots"));
app.use(require("./routes/equipos"));
app.use(require("./routes/paciente"));
app.use(require("./routes/seguimiento"));
app.use(require("./routes/login"));

// Routes Views
app.use(require("./views/views"));
app.use(express.static(path.join(__dirname, "public")));

//Init Server
//Open ServEr in port 3000
var server = app.listen(app.get("port"), () => {
  console.log("server activo en el puerto", app.get("port"));
});
