// ministryHealthOfficial.model.js
module.exports = {
  className: 'MinistryHealthOfficial',
  properties: [
    { name: 'fullName', type: 'String' },
    { name: 'email', type: 'String' },
    { name: 'position', type: 'String' },
    { name: 'accessLevel', type: 'String' } // e.g., 'read-only', 'admin'
  ]
};
