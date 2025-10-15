import jwt from 'jsonwebtoken';

function isRecruiter(req) {
  if (req.user.profile === 'RECRUITER') {
    return true;
  } else {
    return false;
  }
}

export default isRecruiter;