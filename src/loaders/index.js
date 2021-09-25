require("dotenv").config();
const expressLoader = require("./express");

module.exports = (app) => {
	expressLoader({ app });

	const db = require("./db");
};
