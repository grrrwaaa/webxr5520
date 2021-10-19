const path = require("path")

const ws = require("ws")
const express = require('express')

const socketmodule = require("./socketmodule.js")

console.log("socketmodule", socketmodule)

const PORT = 3000
const PUBLIC_PATH = path.join(__dirname, "public")

const app = express()
app.use(express.static(PUBLIC_PATH))

const server = app.listen(PORT, function() {
	console.log(`we are now serving from ${PUBLIC_PATH} at http://localhost:${PORT}`)
})

const wss = socketmodule(server)