import dotenv from 'dotenv';
import Helper from '../helpers/AuthHelper';
import moment from 'moment';
import db from '../models/db';

class UserController {
  /**
   * Method for marking user as verify
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */
  static role(req, res) {
    const { email, isAdmin } = req.body;
    const createQuery = `UPDATE  users SET isAdmin = $1, modified_date=$2 WHERE email = $3`;
    const values = [isAdmin, moment(new Date()), email];

    db.query(createQuery, values).then(user => {
      if (user.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User with the given email not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'User role updated successfully',
      });
    }).catch(e => (e));
  }

  static markVerified(req, res) {
    const email = req.params.email;
    const createQuery = `UPDATE  users SET status = $1, modified_date=$2 WHERE email = $3`;
    const values = ['verified', moment(new Date()), email];

    db.query(createQuery, values).then(user => {
      const createQuery = `SELECT * FROM users WHERE email = $1`;
      db.query(createQuery, [email], (error, user) => {
        return res.status(200).json({
          status: 'Success',
          message: `User with the email ${email} has been verified`,
          data: user.rows[0]
        });
      });
    }).then(e => (e));
  }

  static getAll(req, res) {
    const createQuery = `SELECT * FROM users`;
    db.query(createQuery).then(clients => {
      return res.status(200).send({
        status: 'Success',
        message: 'Clients retrieve successfully',
        data: clients.rows
      });
    })
  }

  static findOne(req, res){
    const clientId = req.params.id;
    const createQuery = `SELECT * FROM users WHERE id = ${clientId}`;
    db.query(createQuery).then(client =>{
      return res.status(200).send({
        status: 'Success',
        message: 'Client retrieve successfully',
        data: client.rows
      });
    });
  }
}

export default UserController;
