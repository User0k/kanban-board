const userResponseFields = require('../constants');

const userAttrFilterer = (user) => {
  return userResponseFields.reduce((filteredObj, field) => {
    if (user.hasOwnProperty(field)) {
      filteredObj[field] = user[field];
    }
    return filteredObj;
  }, {});
};

module.exports = userAttrFilterer;
