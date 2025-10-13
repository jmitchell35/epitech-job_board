import jwt from 'jsonwebtoken';

function isAdmin(req, res, next) {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const { email, profile } = decoded;

    if (profile === 'ADMIN') {
      next();
    } else {
      return res.status(403).json({ message: "Droits administrateurs requis" });
    }

  });
}

export default isAdmin;