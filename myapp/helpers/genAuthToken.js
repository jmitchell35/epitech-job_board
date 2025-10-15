import jwt from 'jsonwebtoken';

function genAuthToken(payload) {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return jwtToken;
}

export default genAuthToken;


