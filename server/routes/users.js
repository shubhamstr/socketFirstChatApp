const express = require("express")
const router = express.Router()
const db = require("../db/db")

router.get("/get-all", (req, res) => {
  let sql = ``
  // console.log(req.query)
  if (req.query.userId) {
    sql = `SELECT * FROM users WHERE id=${req.query.userId}`
  } else if (req.query.ignoreUserId) {
    sql = `SELECT * FROM users WHERE id!=${req.query.ignoreUserId}`
  } else {
    sql = `SELECT * FROM users`
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
      msg: "Users Fetched Successfully!!",
      data: result,
    })
  })
})

router.post("/update-notification", (req, res) => {
  // console.log(req.body);
  var sql = `UPDATE users SET email_notification_flag = ${req.body.email_notification_flag}, push_notification_flag = ${req.body.push_notification_flag}, email_message_flag = ${req.body.email_message_flag}, push_message_flag = ${req.body.push_message_flag} WHERE id = ${req.body.id}`
  db.query(sql, function (err, result) {
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
      msg: "User Notification Updated Successfully!!",
      data: result,
    })
  })
})

router.post("/update-personal", (req, res) => {
  // console.log(req.body);
  var sql = `UPDATE users SET username = '${req.body.userName}', email = '${req.body.email}' WHERE id = ${req.body.id}`
  db.query(sql, function (err, result) {
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
      msg: "User Details Updated Successfully!!",
      data: result,
    })
  })
})

// router.post("/update-image", (req, res) => {
//   // console.log(req.body);
//   var sql = `UPDATE users SET image = '${req.body.image}' WHERE id = ${req.body.id}`
//   db.query(sql, function (err, result) {
//     if (err) {
//       return res.send({
//         err: true,
//         msg: "Server Error",
//         data: err,
//       })
//     }
//     // console.log(result)
//     return res.send({
//       err: false,
//       msg: "User Image Updated Successfully!!",
//       data: result,
//     })
//   })
// })

router.post("/update-password", (req, res) => {
  // console.log(req.body);
  var sql = `UPDATE users SET password = '${req.body.newPassword}' WHERE id = ${req.body.id}`
  db.query(sql, function (err, result) {
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
      msg: "User Password Updated Successfully!!",
      data: result,
    })
  })
})

// router.post("/delete", (req, res) => {
//   // console.log(req.body);
//   var sql = `DELETE FROM users WHERE id = ${req.body.id}`
//   db.query(sql, function (err, result) {
//     if (err) {
//       return res.send({
//         err: true,
//         msg: "Server Error",
//         data: err,
//       })
//     }
//     // console.log(result)
//     return res.send({
//       err: false,
//       msg: "User Deleted Successfully!!",
//       data: result,
//     })
//   })
// })

module.exports = router
