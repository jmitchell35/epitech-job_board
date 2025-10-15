import jwt from 'jsonwebtoken';

function isCandidate(req) {
  if (req.user.profile === 'USER') {
    return true;
  } else {
    return false;
  }
}

export default isCandidate;