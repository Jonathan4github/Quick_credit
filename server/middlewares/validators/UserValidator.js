import validator from 'validator';
import Helper from '../../helpers/AuthHelper';

class UserValidation {

  static roleValidation(req, res, next) {
    const { email, isAdmin } = req.body,
      errorMessage = {};

    if (email === undefined || isAdmin === undefined) {
      return res.status(422).json({
        status: 422,
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
}

export default UserValidation;
