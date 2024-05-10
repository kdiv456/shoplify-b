class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    // super is the constructor of parent class i.e. Error
    this.statusCode = statusCode;

    // below line is totally optional.It is a stack property which means like the complete stack of the error that where this error occurs. Very helpful in development.
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;
