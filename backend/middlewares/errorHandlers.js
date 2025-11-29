const notFound = (req, res, next) => {
  res.status(404).json({ message: "Resource not found", success: false });
};

const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const status = err.status || 500;
  res.status(status).json({ message, success: false });
};

export { notFound, errorHandler };
