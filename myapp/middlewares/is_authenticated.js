import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        res.cookie('isLoggedIn', 'false', {
        httpOnly: false,
        // secure: true,
        sameSite: 'strict'
      });
      return res.status(401).json({ message: "Non autorisé" });
    }
    req.user = decoded;

    next();
  });
}

export default isAuthenticated;