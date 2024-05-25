const express = require("express")
const app = express()
const http = require("http").createServer(app)

const db = require("./db")

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.send("server is running on " + PORT)
})

app.get("/html", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// socket code
const io = require("socket.io")(http)
io.on("connection", (socket) => {
  console.log("connected..")

  socket.on("connected", (username) => {
    socket.broadcast.emit("connected", username)
  })

  socket.on("message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit("message", msg)
  })
})
