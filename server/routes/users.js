const express = require("express")
const router = express.Router()
const db = require("../db/db")

router.get("/get-all", (req, res) => {
  db.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send({
      err: false,
      msg: "Users Fetched Successfully!!",
      data: result,
    })
  })
})

router.post("/register", (req, res) => {
  // console.log(req.body);
  if (req.body.registerType === "guest") {
    var sql = `INSERT INTO users (username) VALUES ('${req.body.userName}')`
  }
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
    res.send({
      err: false,
      msg: "User Inserted Successfully!!",
      data: result,
    })
  })
})

router.post("/update", (req, res) => {
  // console.log(req.body);
  if (req.body.updateType === "notification") {
    var sql = `UPDATE users SET email_notification_flag = ${req.body.email_notification_flag}, push_notification_flag = ${req.body.push_notification_flag}, email_message_flag = ${req.body.email_message_flag}, push_message_flag = ${req.body.push_message_flag} WHERE id = ${req.body.id}`
  } else if (req.body.updateType === "personal") {
    var sql = `UPDATE users SET last_name = '${req.body.last_name}', first_name = '${req.body.first_name}', username = '${req.body.username}', email = '${req.body.email}' WHERE id = ${req.body.id}`
  } else if (req.body.updateType === "image") {
    var sql = `UPDATE users SET image = '${req.body.image}' WHERE id = ${req.body.id}`
  } else if (req.body.updateType === "password") {
    var sql = `UPDATE users SET password = '${req.body.password}' WHERE id = ${req.body.id}`
  }
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
    res.send({
      err: false,
      msg: "User Updated Successfully!!",
      data: result,
    })
  })
})

module.exports = router
