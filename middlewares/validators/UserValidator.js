import userData from '../../models/Users';
import dotenv from 'dotenv';
import validator from 'validator';

class UserValidator {
  /**
   * Method for verifying user
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */

  verifyUser(req, res, next) {
    const email = req.params.email;
    let errorMessage = {};
    /**
     * Search through dummy database to check if user 
     * with the given email address exists
     */
    let user = userData.find(users => users.email === email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: `User with the given email ${email} does not exist`
      });
    }
    // check if user home and work address is empty
    if (!validator.isLength(user.address, { min: 5 })) {
      errorMessage.address = 'User home address is required';
    }
    if (!validator.isLength(user.workAddress, { min: 5 })) {
      errorMessage.workAddress = 'User work address is required';
    }

    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}
export default new UserValidator;