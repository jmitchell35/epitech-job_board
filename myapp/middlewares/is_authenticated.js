import jwt from 'jsonwebtoken';

function isAuthenticated(req, res, next) {
  console.log("checking Authentication");
  const jwtToken = req.cookies["authToken"];
  if (!jwtToken) {
    console.log("No token found");

    return res.status(401).json({ message: "Non autorisé" });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("token is invalid");
        res.cookie('isLoggedIn', 'false', {
        httpOnly: false,
        // secure: true,
        sameSite: 'strict'
      });
      return res.status(401).json({ message: "Non autorisé" });
    }
    console.log("token is valid");

    req.user = decoded;

    next();
  });
}

export default isAuthenticated;