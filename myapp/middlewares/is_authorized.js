function isAuthorized(...helpers) {
  try {
    return async function (req, res, next) {
    for (let i = 0; i < helpers.length; i++) {
      if (helpers[i](req)) {
        return next();
      }
    }
    return res.status(403).json({ message: "Forbidden" });
  }} catch (error) {
    console.error('Authorization error: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default isAuthorized;