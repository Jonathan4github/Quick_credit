import dotenv from 'dotenv';
import Helper from '../helpers/AuthHelper';
import moment from 'moment';
import db from '../models/db';

dotenv.config();

class AuthController {
  /**
   * Method for creating User
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */
  static signup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = Helper.hashPassword(password);

    const createQuery =
      'INSERT INTO users (firstName, lastName, email, password, created_date, modified_date)  VALUES($1, $2, $3, $4, $5, $6) returning *';
    const values = [firstName, lastName, email, hashPassword, moment(new Date()), moment(new Date())];

    db.query(createQuery, values, (error, user) => {
      if (error) {
        return res.status(500).json({
          status: 'Failed',
          message: error
        });
      }
      const token = Helper.generateToken(user.rows[0].id);
      req.token = token;
      return res.status(201).json({
        message: 'Signed up sucessfully',
        status: 201,
        data: [{
          token: token,
          user: user.rows[0]
        }]
      });
    });
  }
}

export default AuthController;
