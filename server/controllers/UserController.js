import dotenv from 'dotenv';
import userData from '../models/Users';
import Helper from '../helpers/AuthHelper';

dotenv.config();

class UserController {
  /**
   * Method for marking user as verify
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */

  static markVerified(req, res) {
    const { email } = req.params;
    /* Search through dummy database to check user with given email */
    const user = userData.find(users => users.email === email);
    /* mark user as verified */
    user.status = 'verified';
    return res.status(200).json({
      status: 200,
      data: user
    });
  }
}

export default UserController;
