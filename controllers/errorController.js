const ErrorResponse = require('./../utils/errorResponse');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ErrorResponse(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/[0]);
  console.log(value);

  const message = `Duplicate field value: ${value}. please use another value`;
  return new ErrorResponse(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.erros).map((el) => el.message);

  const message = `Invalid input data ${errors.join('. ')}`;
  return new ErrorResponse(message, 400);
};

const handleJWTError = () =>
  new ErrorResponse('Invalid token,please log in again', 401);

const handleJWTExpiredError = () =>
  new ErrorResponse('Your token has expired,Kindly log in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error: want to leak details to the client
  } else {
    // log it to the console
    console.error('ERROR 💥', err);
    //send response
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'castError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'validationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'jsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
