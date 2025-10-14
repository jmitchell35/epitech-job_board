import candidateGateway from '../gateways/candidate_gateway.js';

function isCandidateOwner(req) {
  return candidateGateway.get(req.params.uuid)
    .then((candidate) => {

      if (!candidate) {
        return false;
      }

    return candidate.candidateId === req.user.id;
  })
  .catch((error) => {
    console.error;
    throw error;
  })
}

export default isCandidateOwner;