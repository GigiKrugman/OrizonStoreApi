const { CustomAPIError } = require("../Error/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(500).json({ msg: "Something went wrong, please retry!" });
  }
};

module.exports = errorHandlerMiddleware;
