var mysql = require("mysql")
require('dotenv').config()
console.log(process.env)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

db.connect(function (err) {
  if (err) throw err
  console.log("Connected to DB!")
})

module.exports = db
