const db = require('../../../schemas/schema');

add_contact = (userId, req, res, next) => {
  return add_contact_data(userId, req,function (status, _activity) {
    next(status, _activity);
  });
};


function add_contact_data(userId, req, next) {
  let contacts = [...req.body.contacts]
  let newContacts = []
  let contactIds = []

  if (contacts && contacts.length) {
    contacts.map(contact => {
      contact.user_id = userId
      if (contact._id) {
        contactIds.push(contact._id)
      }else {
        delete contact._id
        newContacts.push(contact)
      }
    })
  }

  return new Promise((resolve, reject) => {
    db.emergency_contact.create(newContacts, function (err, response) {
      if (err) {
        console.log('Create Contact Error: ', err)
        reject(err)
      }
      response.map(contact => contactIds.push(contact._id))
      resolve(contactIds)
    })
  })
}

module.exports = add_contact;
