const HttpException = require("../../exceptions/http-exception");

module.exports = (error, request, response, next) => {
	console.error(error);

	// All errors must extend HttpException in order to provide useful feedback
	const status = error instanceof HttpException ? error.status : 500;
	const message =
		error instanceof HttpException && error.message
			? error.message
			: "Something went wrong";

	return response.status(status).json({
		message,
	});
};
