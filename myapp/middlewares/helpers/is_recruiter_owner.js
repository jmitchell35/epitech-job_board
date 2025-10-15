import recruiterGateway from '../../gateways/recruiter_gateway.js';

function isRecruiterOwner(req) {
  return recruiterGateway.get(req.params.uuid)
    .then((recruiter) => {

      if (!recruiter) {
        return false;
      }

    return recruiter.recruiterId === req.user.id;
  })
  .catch((error) => {
    console.error;
    throw error;
  })
}

export default isRecruiterOwner;