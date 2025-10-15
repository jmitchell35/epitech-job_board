import advertisementGateway from '../../gateways/advertisement_gateway.js';
import applicationGateway from '../../gateways/application_gateway.js';

async function isApplicationRecruiter(req) {
  return applicationGateway.get(req.params.uuid)
    .then((application) => {
      if (!application) {
        return false;
      }

      return advertisementGateway.get(application.advertisementId)
        .then((advertisement) => {
          if (!advertisement) {
            return false;
          }
          return advertisement.recruiterId === req.user.id;
        })
    })
    .catch((error) => {
      console.error;
      throw error;
    })
}

export default isApplicationRecruiter;