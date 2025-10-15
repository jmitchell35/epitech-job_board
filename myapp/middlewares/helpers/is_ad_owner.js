import advertisementGateway from '../../gateways/advertisement_gateway.js';

function isAdvertisementOwner(req) {
  return advertisementGateway.get(req.params.uuid)
    .then((advertisement) => {

      if (!advertisement) {
        return false;
      }

    return advertisement.recruiterId === req.user.id;
  })
  .catch((error) => {
    console.error;
    throw error;
  })
}

export default isAdvertisementOwner;