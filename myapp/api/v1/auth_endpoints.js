// Still need the express class
import express from 'express';
import userGateway from '../../gateways/user_gateway.js';
import jwt from 'jsonwebtoken';


// instanciate a router object for v1 routes
const authRouter = express.Router({mergeParams: true});

// use it
authRouter.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const promise = userGateway.getByEmail(username);
  promise.then((user) => {
    console.log(user);

    if (user !== null && password === user.password) {
      console.log('User found and password verified');
      // Encodage du JWT via la variable d'environnement JWT_SECRET
      const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
      res.json(jwtToken);
    } else {
		  res.status(401).json({ message: "Wrong credentials." });
	  }
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

export default authRouter;