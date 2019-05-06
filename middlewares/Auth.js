import jwt from 'jsonwebtoken';
import userData from '../models/Users';

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
            status: 401,
            error: err.message + ' Invalid user'
          })
      }


      let user = userData.find(x => x.id === decoded.userId);
      if (user == undefined) {
        return res.status(401).json({
          status: 401,
          error: 'The token provide is invalid'
        })
      }
      req.user = user;
      next();
    });
  }
}

export default Auth;