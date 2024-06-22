const express = require("express")
const router = express.Router()
const db = require("../db/db")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

const generateToken = (result) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY
  // console.log(jwtSecretKey)
  let data = {
    time: Date(),
    userId: result[0].id,
    userType: "user",
  }
  // console.log(data)
  const token = jwt.sign(data, jwtSecretKey)
  return token
}

router.post("/register", (req, res) => {
  // console.log(req.body);
  if (req.body.registerType === "email") {
    var sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.userName}', '${req.body.email}', '${req.body.password}')`
    db.query(sql, function (err, result) {
      if (err) {
        res.send({
          err: true,
          msg: err.sqlMessage ? err.sqlMessage : "Server Error",
          data: err,
        })
      }
      // console.log(result)
      var sql2 = `SELECT * FROM users WHERE id = '${result.insertId}';`
      db.query(sql2, function (err2, result2) {
        if (err2) {
          res.send({
            err: true,
            msg: "Server Error",
            data: err2,
          })
        }
        // console.log(result2)
        if (result2.length > 0) {
          let token = generateToken(result2)
          res.send({
            err: false,
            msg: "User Register Successfully!!",
            data: token,
          })
        } else {
          res.send({
            err: true,
            msg: "Server Error",
          })
        }
      })
    })
  }
})

router.post("/login", (req, res) => {
  // console.log(req.body)
  if (req.body.loginType === "email") {
    var sql = `SELECT * FROM users WHERE is_active = 1 AND email = '${req.body.email}' AND password = '${req.body.password}';`
  } else if (req.body.loginType === "google") {
    var sql = `SELECT * FROM users WHERE is_active = 1 AND email = '${req.body.email}';`
  }
  db.query(sql, function (err, result) {
    if (err) {
      res.send({
        err: true,
        msg: "Server Error",
        data: err,
      })
    }
    // console.log(result)
    if (result.length > 0) {
      let token = generateToken(result)
      res.send({
        err: false,
        msg: "User LoggedIn Successfully!!",
        data: token,
      })
    } else {
      res.send({
        err: true,
        msg: "Invalid Username/Password",
      })
    }
  })
})

module.exports = router
