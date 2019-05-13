import dotenv from 'dotenv';
import validator from 'validator';
import userData from '../../models/Users';

class UserValidator {
  /**
   * Method for verifying user
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */

  static verifyUser(req, res, next) {
    const { email } = req.params;
    const errorMessage = {};
    const user = userData.find(user => user.email === email);
    if (!user) {
      return res.status(422).json({
        status: 422,
        error: `User with the given email ${email} does not exist`
      });
    }
    
    if (!validator.isLength(user.address, { min: 5 })) {
      errorMessage.address = 'User home address is required';
    }
    if (!validator.isLength(user.workAddress, { min: 5 })) {
      errorMessage.workAddress = 'User work address is required';
    }

    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(422).json(errorMessage);
    }
    return next();
  }
}
export default UserValidator;
