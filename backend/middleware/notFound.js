// JSON 404 fallback. Express 5 otherwise returns an HTML error page, which
// breaks clients that expect the { message } convention.
const notFound = (req, res) => {
  res
    .status(404)
    .json({ message: `Not found: ${req.method} ${req.originalUrl}` });
};

module.exports = notFound;
