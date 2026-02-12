import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // If error is not ApiError, convert it
  if (!(err instanceof ApiError)) {
    err = new ApiError(statusCode, message);
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
};

export { errorHandler };
