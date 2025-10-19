const localModel = {
  name: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  industry: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  contactEmail: { tag: 'input', type: 'email', required: true, maxLength: 255 },
  headOffice: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  endpoint: 'companies',
  entity: { singular: 'company', plural: 'companies'}
};
