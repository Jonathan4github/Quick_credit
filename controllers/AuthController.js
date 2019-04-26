import userData from '../models/Users';
import Helper from '../helpers/AuthHelper';
import dotenv from 'dotenv';

dotenv.config();

class userController {
  /**
   * Method for creating User
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */
  signup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const newUser = {
      id: userData.length + 1,
      firstName,
      lastName,
      email,
      password: hashPassword
    }

    userData.push(newUser);
    const token = Helper.generateToken(newUser.id);
    req.token = token;
    return res.status(201)
      .json({
        status: 201,
        data: [{
          token: token,
          user: newUser
        }]
      });
  }

  signin(req, res) {
    const { email, password } = req.body;
    let user = userData.find(x => x.email === email);
    if (user) {
      const isPassword = Helper.comparePassword(user.password, password);
      if (isPassword) {
        const token = Helper.generateToken(user.id);
        req.token = token;
        return res.status(200).json({
          status: 200,
          data: [{
            token: token,
            message: 'login successfully'
          }]
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'The credentials you provided is incorrect'
    });
  }


}

export default new userController;