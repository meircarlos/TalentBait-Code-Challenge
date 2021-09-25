const express = require("express");
const loaders = require("./src/loaders");
const config = require("./src/config");

startServer();

async function startServer() {
	const app = express();

	// Health endpoint checker
	app.get("/health", (req, res) => {
		return res.send("Hello World!");
	});

	const appDetails = await loaders(app);

	const server = await app.listen(config.port);

	if (process.env.NODE_ENV === "development") {
		console.log(
			`The server is running on http://localhost:${config.port}.`
		);
	}

	return {
		server,
	};
}
