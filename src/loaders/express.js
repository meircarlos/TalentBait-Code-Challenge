const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("../config");
const views = require("../views");
const routes = require("../api");
const errorMiddleware = require("../api/middlewares/error-handler");

module.exports = ({ app }) => {
	app.use(cors());

	app.use(express.static(__dirname + "/../../public"));
	app.set("view engine", "ejs");
	app.set("views", [
		path.join(__dirname, "../views"),
		path.join(__dirname, "../views/sentences"),
	]);

	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: true,
		})
	);

	app.use("/", views());

	app.use(config.api.prefix, routes());

	app.use(errorMiddleware);
};
