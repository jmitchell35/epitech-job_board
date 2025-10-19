const localModel = {
  firstName: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  lastName: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  phone: { tag: 'input', type: 'tel', required: true, maxLength: 255 },
  message: { tag: 'textarea', required: true, minLength: 10 },
  candidateId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'users' },
  endpoint: 'candidates',
  entity: { singular: 'candidate profile', plural: 'candidate profiles'}
};
