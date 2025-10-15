import applicationGateway from '../../gateways/application_gateway.js';

function isApplicationOwner(req) {
  return applicationGateway.get(req.params.uuid)
    .then((application) => {

      if (!application) {
        return false;
      }

    return application.candidateId === req.user.id;
  })
  .catch((error) => {
    console.error;
    throw error;
  })
}

export default isApplicationOwner;