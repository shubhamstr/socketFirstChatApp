const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;


http.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send('hello world');
    res.sendFile(__dirname + '/index.html');
})