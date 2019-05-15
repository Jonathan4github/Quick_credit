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
    const user = userData.find(user => user.email === email);
    user.status = 'verified';
    return res.status(200).json({
      status: 200,
      message: 'User has been successfully marked as verified',
      data: user
    });
  }
}

export default UserController;
