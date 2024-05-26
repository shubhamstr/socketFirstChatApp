const express = require("express")
const router = express.Router()
const db = require("../db/db")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

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
      msg: "User Register Successfully!!",
      data: result,
    })
  })
})

router.post("/login", (req, res) => {
  // console.log(req.body);
  if (req.body.loginType === "email") {
    var sql = `SELECT * FROM users WHERE is_active = 1 AND email = '${req.body.email}' AND password = '${req.body.password}';`
  } else if (req.body.loginType === "google") {
    var sql = `SELECT * FROM users WHERE is_active = 1 AND email = '${req.body.email}';`
  }
  db.query(sql, function (err, result) {
    if (err) throw err
    // console.log(result)
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    // console.log(jwtSecretKey)
    let data = {
      time: Date(),
      userId: result[0].id,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      userName: result[0].username,
      image: result[0].image,
      email: result[0].email,
      email_notification_flag: result[0].email_notification_flag,
      push_notification_flag: result[0].push_notification_flag,
      email_message_flag: result[0].email_message_flag,
      push_message_flag: result[0].push_message_flag,
    }
    // console.log(data)
    const token = jwt.sign(data, jwtSecretKey)
    res.send({
      err: false,
      msg: "User LoggedIn Successfully!!",
      data: token,
    })
  })
})

module.exports = router
