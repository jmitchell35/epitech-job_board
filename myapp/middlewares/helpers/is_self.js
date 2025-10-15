import jwt from 'jsonwebtoken';

function isSelf(req) {
  const jwtToken = req.cookies["jwtToken"];
  if (req.params.uuid === req.user.id) {
    return true;
  } else {
    return false;
  }
}

export default isSelf;