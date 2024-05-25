var mysql = require("mysql")
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socket_chat",
})

db.connect(function (err) {
  if (err) throw err
  console.log("Connected to DB!")
})

module.exports = db
