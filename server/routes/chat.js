const express = require("express")
const router = express.Router()
const db = require("../db/db")
const dotenv = require("dotenv")

// Set up Global configuration access
dotenv.config()

router.post("/insert", (req, res) => {
  // console.log(req.body)
  var sql = `INSERT INTO users (sent_by_user_id, send_to_user_id, message) VALUES ('${req.body.sent_by_user_id}', '${req.body.send_to_user_id}', '${req.body.message}')`
  db.query(sql, function (err, result) {
    if (err) {
      res.send({
        err: true,
        msg: err.sqlMessage ? err.sqlMessage : "Server Error",
        data: err,
      })
    }
    // console.log(result)
    if (result.length > 0) {
      res.send({
        err: false,
        msg: "Message Sent Successfully!!",
        data: token,
      })
    } else {
      res.send({
        err: true,
        msg: "Error While Sending Message",
      })
    }
  })
})

module.exports = router