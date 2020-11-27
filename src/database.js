const mysql = require("mysql");
/*
const mysqlconecct = mysql.createConnection({
  host: "localhost",
  database: "seguimientocovid",
  user: "root",
  password: "",
  port: 3306,
});
*/
const mysqlconecct = mysql.createConnection({
  host: "cesarsdb.cvgsgdqliqq7.us-east-1.rds.amazonaws.com",
  database: "seguimientocovid",
  user: "admin",
  password: "cesars123",
  port: 3306,
});

/*
define('DB_SERVER', "cesarsdb.cvgsgdqliqq7.us-east-1.rds.amazonaws.com");
define('DB_USER', "admin");
define('DB_PASS', "cesars123");
define('DB_DATABASE', "carrito"); */
mysqlconecct.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Db is connect");
  }
});

module.exports = mysqlconecct;
