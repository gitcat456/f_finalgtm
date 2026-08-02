const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Set default code and message if not present
  if (!statusCode) {
    statusCode = 500;
  }
  if (!message) {
    message = 'Internal Server Error';
  }

  const response = {
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
