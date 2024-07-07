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

const runQuery = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        resolve({
          error: true,
          msg: err.sqlMessage ? err.sqlMessage : "Server Error",
          data: err,
        })
      }
      resolve({
        error: false,
        data: result,
      })
    })
  })
}

router.post("/login", async (req, res) => {
  // console.log(req.body)
  if (req.body.loginType === "userName") {
    var sql1 = `INSERT INTO users (username) VALUES ('${req.body.userName}')`
    const resp1 = await runQuery(sql1)
    // console.log(resp1)
    if (resp1.err) {
      res.send({
        err: resp1.err,
        msg: resp1.msg,
        data: resp1.data,
      })
    }
    var sql2 = `SELECT * FROM users WHERE id = '${resp1.data.insertId}';`
    const resp2 = await runQuery(sql2)
    // console.log(resp2)
    if (resp2.err) {
      res.send({
        err: true,
        msg: resp2.msg,
        data: resp2.data,
      })
    } else {
      if (resp2.data.length > 0) {
        let token = generateToken(resp2.data)
        res.send({
          err: false,
          msg: "User Logged In Successfully!!",
          data: token,
        })
      } else {
        res.send({
          err: true,
          msg: "Server Error",
        })
      }
    }
  }
})

module.exports = router
