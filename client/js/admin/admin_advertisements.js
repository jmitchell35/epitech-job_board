const localModel = {
  title: { tag: 'input', type: 'text', required: true, minLength: 10, maxLength: 255 },
  shortDescription: { tag: 'input', type: 'text', required: true, minLength: 10, maxLength: 255 },
  fullDescription: { tag: 'textarea', required: true, minLength: 10 },
  wages: { tag: 'input', type: 'text', required: true, minLength: 10, maxLength: 255 },
  city: { tag: 'input', type: 'text', required: true, minLength: 2, maxLength: 255 },
  workingTime: { tag: 'select', required: true, options: ['Temps plein', 'Temps partiel', 'Stage'] },
  remoteWork: { tag: 'select', required: true, options: ['Oui', 'Partiel', 'Non'] },
  companyId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'companies' },
  recruiterId: { tag: 'select', required: true, pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', fetchOption: 'users/profile/RECRUITER' },
  endpoint: 'job_advertisements',
  entity: { singular: 'advertisement', plural: 'advertisements'}
}
