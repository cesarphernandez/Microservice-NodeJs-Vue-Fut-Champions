const mysql = require('mysql');

var conexionDB = mysql.createConnection({
    host: "fifafut21.cxoyamjuaana.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "lLGDHxlQPEjW8vKZcHTi",
    database: "FifaFut21"
  });

  export default conexionDB;