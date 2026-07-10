function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  // Case cloudinary
  if (
    err.http_code ||
    (err.message &&
      (err.message.includes("api_key") ||
        err.message.includes("cloud_name") ||
        err.message.includes("Cloudinary")))
  ) {
    status = err.http_code || 401;
    message = `Cloudinary Error: ${err.message}`;
    
    return res.status(status).json({ message });
  }

  // Global Case
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "EmailRequired":
      status = 400;
      message = "Email tidak boleh kosong";
      break;

    case "PasswordRequired":
      status = 400;
      message = "Password tidak boleh kosong";
      break;

    case "InvalidRequest":
      status = 400;
      message = err.message;
      break;

    case "InvalidCredentials":
      status = 401;
      message = " Email atau password yang anda masukan salah";
      break;

    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Login untuk mendapatkan akses";
      break;

    case "Forbidden":
      status = 403;
      message = err.message;
      break;

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
