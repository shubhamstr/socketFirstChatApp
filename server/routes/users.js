const express = require("express")
const router = express.Router()
const db = require("../db/db")

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now())
  next()
}
router.use(timeLog)

router.get("/get-all", (req, res) => {
  res.send("About birds")
})

module.exports = router
