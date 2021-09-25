process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
	port: process.env.PORT || 3000,
	api: {
		prefix: "/api",
	},
};
