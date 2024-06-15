const errorHandler = async (error, req, res, next) => {
  // console.log(error.name, "<<<<< ERROR is here");
  // console.log(error);
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({
      message: error.errors[0].message,
    });
  } else if (
    error.name === "username required" ||
    error.name === "password required"
  ) {
    res.status(400).json({
      message: "The username and password cannot be empty",
    });
  } else if (error.name === "Unauthorized") {
    res.status(401).json({
      message: "The username or password is incorrect",
    });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "Token Unauthorized"
  ) {
    res.status(401).json({
      message: "The token is invalid",
    });
  } else if (error.name === "Forbiden") {
    res.status(404).json({
      message: "Forbiden Access",
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
