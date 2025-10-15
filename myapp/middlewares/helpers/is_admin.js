import jwt from 'jsonwebtoken';

function isAdmin(req) {
  if (req.user.profile === 'ADMIN') {
    return true;
  } else {
    return false;
  }
}

export default isAdmin;