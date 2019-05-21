import db from '../../models/db';

class RepaymentsValidator {
  /**
  * Method for validating loan balance
  * @static
  * @param {request} req
  * @param {response} res
  * @return {obj} return json object.
  */

  static validateRepayment(req, res, next) {
    const id = req.params.id;
    const createQuery = `SELECT * FROM loans WHERE id = $1`;

    db.query(createQuery, [id]).then(loan => {
      const {balance, status} = loan.rows[0]

      if(loan.rowCount == '0'){
        return res.status(404).send({
            status: 404,
            error: 'Loan with the provided id does not exist'
        });
      }
      if (balance == 0 || balance <= 0) {
        return res.status(200).json({
          status: 200,
          error: 'Loan with the provided id has been fully paid'
        });
      }
    }).catch(e =>(e));
    return next();
  }
}

export default RepaymentsValidator;