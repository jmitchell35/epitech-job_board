const localModel = {
  application_email: { tag: 'input', type: 'email', required: true, maxLength: 255 },
  companyId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'companies' },
  recruiterId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'users' },
  endpoint: 'recruiters',
  entity: { singular: 'recruiter profile', plural: 'recruiter profiles'}
};
