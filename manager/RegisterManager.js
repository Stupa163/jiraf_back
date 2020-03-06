const bcrypt = require('bcrypt');
const Models = require('../models');

exports.createCompany = (name, siret, status) => {
  const company = new Models.Company();

  company.name = name;
  company.siret = siret;
  company.status = status;

  return company;
};

exports.createUser = (firstName, lastName, plainPassword, mail, phone, profile, company) => new Promise(
  async (resolve, reject) => {
    const user = new Models.User();
    try {
      user.password = await bcrypt.hash(plainPassword, await bcrypt.genSalt());
      user.firstName = firstName;
      user.lastName = lastName;
      user.mail = mail;
      user.phone = phone;
      user.profile = profile;
      user.company = company;

      resolve(user);
    } catch (e) {
      reject(e);
    }
  },
);
