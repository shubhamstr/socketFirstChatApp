const express = require("express")
const router = express.Router()
const db = require("../db/db")

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now().toLocaleString())
  next()
}
router.use(timeLog)

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

router.post("/insert", (req, res) => {
  if (req.body.signUpType === "guest") {
    var sql = `INSERT INTO users (username) VALUES (${req.body.userName})`
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

module.exports = router
