import validator from 'validator';
import Helper from '../../helpers/AuthHelper';
import db from '../../models/db';

class UserValidation {

  static roleValidation(req, res, next) {
    const { email, isAdmin } = req.body,
      errorMessage = {};

    if (email === undefined || isAdmin === undefined) {
      return res.status(422).json({
        status: 'Failed',
        error: 'All or some of the field is/are undefined'
      });
    }
    if (!validator.isEmail(email)) {
      errorMessage.email = 'Please enter a valid email';
    }
    if (!(isAdmin == 'true' || isAdmin == 'false')) {
      errorMessage.isAdmin = 'isAdmin should be true or false';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(422).json(errorMessage);
    }  
    return next();  
  }

  static verifyValidation(req, res, next) {
    const email = req.params.email;

    if(!validator.isEmail(email)) {
      return res.status(422).json({
        status: 'Failed',
        error: 'Please enter a valid email'
      });
    }
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (error, userfound) => {
      if (userfound.rowCount === 0) {
        return res.status(404).json({
          status: 'Failed',
          error: 'User with the given email not found'
        });
      }
      if(userfound.rows[0].status == 'verified') {
        return res.status(200).send({
          message: 'User with the given email has already been verified'
        });
      }
      return next();
    });
  }
}

export default UserValidation;
