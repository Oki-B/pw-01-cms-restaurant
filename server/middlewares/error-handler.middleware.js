function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  // Global Case
  switch (err.name) {
    case "NotFound":
      status = 404;
      message = err.message;
      break;
    default:
      break;
  }

  return res.status(status).json({ message });
}

module.exports = errorHandler;
