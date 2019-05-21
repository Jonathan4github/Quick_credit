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
    const { firstName, lastName, email, password, work_address, home_address } = req.body;
    const hashPassword = Helper.hashPassword(password);

    const createQuery =
      'INSERT INTO users (firstName, lastName, email, password, work_address, home_address, created_date, modified_date)  VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
    const values = [firstName, lastName, email, hashPassword, work_address, home_address, moment(new Date()), moment(new Date())];

    db.query(createQuery, values).then(user => {
      const token = Helper.generateToken(user.rows[0].id);
      req.token = token;
      return res.status(201).send({
        message: 'Signed up sucessfully',
        status: 201,
        data: [{
          token: token,
          user: user.rows[0]
        }]
      });
    }).catch(e=>(e));
  }
  /**
   * Method for signing in User
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */
  static signin(req, res) {
    const { email, password } = req.body;
    const createQuery = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(createQuery).then(user => {
      if (user.rows[0]) {
        const isPassword = Helper.comparePassword(user.rows[0].password, password);
        if (isPassword) {
          const token = Helper.generateToken(user.rows[0].id);
          req.token = token;
          return res.status(200).json({
            message: 'Signed in sucessfully',
            status: 200,
            data: [{
              token,
              user: user.rows[0]
            }]
          });
        }
      }
      return res.status(401).json({
        status: 401,
        error: 'The credentials you provided is incorrect'
      });
    }).catch(e => (e));
  }
}

export default AuthController;
