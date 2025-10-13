// Still need the express class
import express from 'express';
import userGateway from '../../gateways/user_gateway.js';
import jwt from 'jsonwebtoken';


// instanciate a router object for v1 routes
const authRouter = express.Router({mergeParams: true});

// use it
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  const promise = userGateway.getByEmail(email);
  promise.then((user) => {
    console.log(user);

    if (user !== null && password === user.password) {
      // Encodage du JWT via la variable d'environnement JWT_SECRET
      const { email, profile } = user;
      const jwtToken = jwt.sign({ email, profile }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
        // secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });
      res.json(jwtToken);
    } else {
		  res.status(401).json({ message: "Identifiants incorrects." });
	  }
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie("jwtToken");
	res.redirect('/');
});

export default authRouter;