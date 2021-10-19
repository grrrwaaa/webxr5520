const ws = require("ws")

function makeWebSocketServer(server) {
	const wss = new ws.Server({ server })

	wss.on("connection", function(client) {
		client.binaryType = 'arraybuffer';
		console.log("I received a connection!")

		// we have a new unique client

		client.on("message", function(buf) {
			const msg = buf.toString()
			console.log("I received a message", msg)

			client.send(JSON.stringify({
				cmd: "echo",
				data: "hi"
			}))
		})

		client.on("error", function(err) {
			console.error(err)
		})

		client.on("close", function() {
			console.log("client left us")
		})
	})

	// to send a message to *everyone*:
	function sendAllClients(message) {
		wss.clients.forEach(client => {
			client.send(message);
		});
	}
}

module.exports = makeWebSocketServer