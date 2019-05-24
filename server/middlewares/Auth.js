import jwt from 'jsonwebtoken';
import db from '../models/db';

const Auth = {
  /**
   * Method to verify token
   * @param {request} req
   * @param {response} res
   * @param {}
   */

  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401)
          .json({
            status: 'Failed',
            error: 'un-Authorized user'
          })
      }

      const createQuery = `SELECT * FROM users WHERE id = ${decoded.userId}`;
      db.query(createQuery, (error, user) => {
        if (user.rowCount == 0) {
          return res.status(401).json({
            status: 'Failed',
            error: 'un-Authorized user'
          })
        }
        req.user = user;
        next();
      });
    });
  }
}

export default Auth;
