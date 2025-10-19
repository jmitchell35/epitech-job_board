const localModel = {
  message: { tag: 'textarea', required: true, minLength: 10 },
  candidateEmail: { tag: 'input', type: 'email', required: true, maxLength: 255 },
  firstName: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  lastName: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  phone: { tag: 'input', type: 'tel', required: true, maxLength: 255 },
  candidateId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'users/profile/USER' },
  advertisementId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'job_advertisements' },
  endpoint: 'job_applications',
  entity: { singular: 'application', plural: 'applications'}
};
