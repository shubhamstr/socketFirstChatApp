const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

const users = require("./routes/users")

const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("server is running on " + PORT)
})

app.get("/html", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.use("/users", users)

// socket io
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

// listen on port
http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
