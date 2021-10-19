const path = require("path")

const ws = require("ws")
const express = require('express')

const socketmodule = require("./socketmodule.js")

console.log("socketmodule", socketmodule)

// this will be true if this server is running on Heroku
const IS_HEROKU = (process.env._ && process.env._.indexOf("heroku") !== -1);
const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, "public")

const app = express()
app.use(express.static(PUBLIC_PATH))

// default to index.html if no file given:
app.get("/", function(req, res) {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"))
});

const server = app.listen(PORT, function() {
	console.log(`we are now serving from ${PUBLIC_PATH} at http://localhost:${PORT}`)
})

const wss = socketmodule(server)