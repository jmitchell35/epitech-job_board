import jwt from 'jsonwebtoken';

function isAuthorized(...helpers) {
  return function (req, res, next) {
    const jwtToken = req.cookies["jwtToken"];

    if (!jwtToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;

      for (let i = 0; i < helpers.length; i++) {
          if (helpers[i](req)) {
            return next();
          }
        }

        return res.status(403).json({ message: "Forbidden" });
    });
  }
}

export default isAuthorized;