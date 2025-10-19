const localModel = {
  email: { tag: 'input', type: 'email', required: true, maxLength: 255 },
  password: { tag: 'input', type: 'password', required: true, minLength: 8, maxLength: 255 },
  profile: { tag: 'select', required: true, options: ['USER', 'CANDIDATE', 'RECRUITER'] },
  endpoint: 'users',
  entity: { singular: 'user', plural: 'users'}
};