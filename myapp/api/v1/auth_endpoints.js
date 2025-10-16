// Still need the express class
import express from 'express';
import userGateway from '../../gateways/user_gateway.js';
import genAuthToken from '../../helpers/genAuthToken.js';
import recruiterGateway from '../../gateways/recruiter_gateway.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';


// instanciate a router object for v1 routes
const authRouter = express.Router({ mergeParams: true });

// use it
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  const promise = userGateway.getByEmail(email);
  promise.then((user) => {
    console.log(user);

    if (user !== null && password === user.password) {
      // Encodage du JWT via la variable d'environnement JWT_SECRET
      const { id, email, profile } = user;
      const jwtToken = genAuthToken({ id, email, profile });

      res.cookie("authToken", jwtToken, {
        httpOnly: true,
        // secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.cookie('isLoggedIn', 'true', {
        httpOnly: false,
        // secure: true,
        sameSite: 'strict'
      });

      res.cookie('userId', user.id, {
        httpOnly: false,
        // secure: true,
        sameSite: 'strict'
      });

      if (profile === 'RECRUITER') {
        const recruiterPromise = recruiterGateway.findOneByAttribute('recruiterId', user.id);
        recruiterPromise.then((recruiter) => {
          const { companyId } = recruiter;

          res.cookie('companyId', companyId, {
            httpOnly: false,
            // secure: true,
            sameSite: 'strict'
          });

          res.json({ profile });
        })
      } else {
        res.json({ profile });
      }
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
  res.cookie('isLoggedIn', 'false', {
    httpOnly: false,
    // secure: true,
    sameSite: 'strict'
  });

  res.clearCookie("authToken");
  res.sendStatus(200);
});

export default authRouter;