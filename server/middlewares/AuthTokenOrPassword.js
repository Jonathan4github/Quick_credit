import jwt from 'jsonwebtoken';
import db from '../models/db';

class AuthTokenOrPassword {

  static verify(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token){
      return next();
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401)
          .json({
            status: 'Failed',
            error: 'Invalid user'
          })
      }
      const createQuery = `SELECT * FROM users WHERE id = ${decoded.userId}`;
      db.query(createQuery, (error, user) => {
        if (user.rowCount == 0) {
          return res.status(401).json({
            status: 'Failed',
            error: 'The credential you provided is invalid'
          });
        }
        req.user = user.rows[0];
        return res.status(200).send({
          status: 'Success',
          message: 'Signed in sucessfully',
          data: user.rows[0]
        })
      })
    });
  }
}

export default AuthTokenOrPassword;
