import validator from 'validator';
import Helper from '../../helpers/AuthHelper';
import db from '../../models/db';


class UserValidation {
  static Signup(req, res, next) {
    const { firstName, lastName, email, password, workAddress, homeAddress } = req.body,
      errorMessage = {};

    if (firstName === undefined || lastName === undefined || email === undefined || password === undefined
      || workAddress === undefined || homeAddress === undefined) {
      return res.status(422).json({
        status: 'Failed',
        error: 'All or some of the field is/are undefined'
      });
    }

    db.query(`SELECT id FROM users WHERE email = '${email}'`).then(userfound => {
      if (userfound.rows.length > 0) {
        return res.status(409).json({
          status: 'Failed',
          error: 'The email you entered already exist'
        });
      }
      if (!validator.isLength(firstName, { min: 2, max: 20 })) {
        errorMessage.firstName = 'First name must not be less than 2 or above 17 characters';
      }
      if (!validator.isLength(lastName, { min: 2, max: 20 })) {
        errorMessage.lastName = 'Lastname must not be less than 2 or above 17 characters';
      }
      if (firstName.search(/^[a-zA-Z]*$/) === -1) {
        errorMessage.firstName = 'First name should be all alphalbet';
      }
      if (lastName.search(/^[a-zA-Z]*$/) === -1) {
        errorMessage.lastName = 'Last name should be all alphalbet';
      }

      if (!validator.isEmail(email)) {
        errorMessage.email = 'Please enter a valid email';
      }
      if (!validator.isLength(password, { min: 7, max: 20 })) {
        errorMessage.password = 'password must not be less than 7 or above 10 characters';
      }
      if (!validator.isLength(workAddress, { min: 7, max: 30 })) {
        errorMessage.workAddress = 'work address must not be less than 7 or above 30 characters';
      }
      if (!validator.isLength(homeAddress, { min: 7, max: 30 })) {
        errorMessage.homeAddress = 'home address must not be less than 7 or above 30 characters';
      }

      if (!(Object.keys(errorMessage).length === 0)) {
        return res.status(422).json(errorMessage);
      }
      return next();
    });
  }

  static Signin(req, res, next) {
    const { email, password } = req.body,
      errorMessage = {};

    if (email === undefined || password === undefined) {
      return res.status(422).json({
        status: 'Failed',
        error: 'All or some of the field is/are undefined'
      });
    }

    if (!Helper.isValidEmail(email)) {
      errorMessage.email = 'Please enter a valid email';
    }
    if (!validator.isLength(password, { min: 7, max: 20 })) {
      errorMessage.password = 'Please enter a valid password';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(422).json(errorMessage);
    }
    return next();
  }
}

export default UserValidation;
