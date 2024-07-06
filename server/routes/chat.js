const express = require("express")
const router = express.Router()
const db = require("../db/db")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

router.post("/insert", (req, res) => {
  // console.log(req.body)
  var sql = `INSERT INTO messages (sent_by_user_id, sent_to_user_id, message) VALUES ('${req.body.sent_by_user_id}', '${req.body.sent_to_user_id}', '${req.body.message}')`
  // console.log(sql)
  db.query(sql, function (err, result) {
    if (err) {
      res.send({
        err: true,
        msg: err.sqlMessage ? err.sqlMessage : "Server Error",
        data: err,
      })
    }
    // console.log(result)
    if (result.insertId) {
      res.send({
        err: false,
        msg: "Message Sent Successfully!!",
      })
    } else {
      res.send({
        err: true,
        msg: "Error While Sending Message",
      })
    }
  })
})

router.get("/get-all", (req, res) => {
  let sql = ``
  // console.log(req.query)
  if (req.query.sent_by_user_id && req.query.sent_to_user_id) {
    sql = `SELECT * FROM messages WHERE sent_by_user_id=${req.query.sent_by_user_id} AND sent_to_user_id=${req.query.sent_to_user_id}`
  } else {
    sql = `SELECT * FROM messages`
  }
  db.query(sql, function (err, result, fields) {
    if (err) {
      res.send({
        err: true,
        msg: "Server Error",
        data: err,
      })
    }
    // console.log(result)
    res.send({
      err: false,
      msg: "Chat Fetched Successfully!!",
      data: result,
    })
  })
})

module.exports = router
