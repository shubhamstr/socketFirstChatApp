const express = require("express")
const router = express.Router()
const db = require("../db/db")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

router.post("/insert", (req, res) => {
  // console.log(req.body)
  const user_id = req.body.user_id.toString()
  const room_id = req.body.room_id.toString()
  var sql = `INSERT INTO messages (user_id, room_id, message) VALUES ('${user_id}', '${room_id}', '${req.body.message}')`
  // console.log(sql)
  db.query(sql, function (err, result) {
    if (err) {
      return res.send({
        err: true,
        msg: err.sqlMessage ? err.sqlMessage : "Server Error",
        data: err,
      })
    }
    // console.log(result)
    if (result.insertId) {
      return res.send({
        err: false,
        msg: "Message Sent Successfully!!",
      })
    } else {
      return res.send({
        err: true,
        msg: "Error While Sending Message",
      })
    }
  })
})

router.get("/get-all", (req, res) => {
  let sql = ``
  // console.log(req.query)
  if (req.query.room_id) {
    sql = `SELECT * FROM messages WHERE room_id = '${req.query.room_id}'`
  } else {
    return res.send({
      err: true,
      msg: "Server Error",
      data: "",
    })
  }
  db.query(sql, function (err, result, fields) {
    if (err) {
      return res.send({
        err: true,
        msg: "Server Error",
        data: err,
      })
    }
    // console.log(result)
    return res.send({
      err: false,
      msg: "Chat Fetched Successfully!!",
      data: result,
    })
  })
})

module.exports = router
