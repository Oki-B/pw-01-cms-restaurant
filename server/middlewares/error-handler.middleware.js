function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  // Global Case
  switch (err.name) {
    default:
      break;
  }

  return res.status(status).json({ message });
}
