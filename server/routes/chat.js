const express = require("express")
const router = express.Router()
const db = require("../db/db")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

router.post("/insert", (req, res) => {
  // console.log(req.body)
  // const ids = req.body.user_ids.toString()
  const user_id = req.body.user_id.toString()
  const room_id = req.body.room_id.toString()
  var sql = `INSERT INTO messages (user_id, room_id, message) VALUES ('${user_id}', '${room_id}', '${req.body.message}')`
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
  if (req.query.loggedInId && req.query.selectedChatId) {
    sql = `SELECT * FROM messages WHERE user_ids LIKE '%${req.query.loggedInId}%' AND user_ids LIKE '%${req.query.selectedChatId}%'`
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
