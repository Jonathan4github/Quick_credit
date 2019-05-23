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
      if (loan.rowCount == '0') {
        return res.status(404).send({
          status: 404,
          error: 'Loan with the provided id does not exist'
        });
      }
      const { balance, status } = loan.rows[0]
      if (status !== 'approve') {
        return res.status(422).send({
          status: 422,
          error: 'Loan with the provided id is still under pending'
        });
      }
      if (balance == 0) {
        return res.status(400).json({
          status: 400,
          error: 'Loan with the provided id has been fully paid'
        });
      }
     next();
    }).catch(e => (e));
  }

  static getRepaymentsValidator(req, res, next) {
    const id = req.params.id;
    const createQuery = `SELECT * FROM loans WHERE id = $1`;

    db.query(createQuery, [id]).then(loan => {
      if (loan.rowCount == '0') {
        return res.status(404).send({
          status: 404,
          error: 'Loan with the provided id does not exist'
        });
      }
      return next();
    }).catch(e => (e));
  }
}

export default RepaymentsValidator;
