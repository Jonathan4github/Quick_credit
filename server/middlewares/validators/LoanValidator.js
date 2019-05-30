import db from '../../models/db';

class LoanValidator {
  /**
   * Method for validating loan application
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object.
   */
  static validateLoanApplication(req, res, next) {
    const { amount, tenor } = req.body;
    let errorMessage = {};

    if (isNaN(amount) || (amount < 1000) || (amount > 10000000)) {
      errorMessage.amount = 'amount should be number & not less than 1000 or above 10000000';
    }
    if (isNaN(tenor) || tenor < 1 || tenor > 12) {
      errorMessage.tenor = 'tenor should be number & not less than 1 or above 12';
    }

    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    const { status, id } = req.user.rows[0];

    if (status !== 'verified') {
      return res.status(400).send({
        status: 'Failed',
        error: 'You are not yet verified'
      });
    }

    const creatQuery = `SELECT * FROM loans WHERE userId = $1`;
    db.query(creatQuery, [id]).then(loan => {
      if (loan.rows.length == 0) {
        return next()
      }
      const { status, repaid } = loan.rows[0];
      if (status !== 'approved') {
        return res.status(400).send({
          status: 'Failed',
          error: `Your applied loan status is ${status}`
        });
      }
      if (loan.rows.length !== 0 && repaid == false) {
        return res.status(400).send({
          status: 'Failed',
          error: `You cannot apply. You still have outstanding`
        });
      }

      next();

    }).catch(e => (e));

  }

  static validateQueryParams(req, res, next) {
    //check if query parimeter is empty  return all loan    
    let queryParimeters = req.query;
    if (Object.keys(queryParimeters).length === 0) {
      return next();
    }
    /**
     * get values from query parimenter
     */
    let loanStatus = queryParimeters['status'];
    let loanRepaid = queryParimeters['repaid'];

    /**
     * validate query parimeter if it has 
     * object property of status and repaid else
     * throw an error message.
     */
    let errorMessage = {};
    if (!(loanRepaid == 'true' || loanRepaid == 'false')) {
      errorMessage.repaid = 'repaid value is required & should be true or false'
    }
    if (!(loanStatus == 'approved' || loanStatus == 'pending' || loanStatus == 'rejected')) {
      errorMessage.status = 'status value is required & should be pending, approved, rejected'
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    return next();
  }

  static loanStatus(req, res, next) {
    let { status } = req.body;
    if (!((status == 'approved') || (status == 'reject'))) {
      return res.status(422).json({
        status: 'Failed',
        error: 'status required & should be approved or reject'
      });
    }
    return next();
  }
}

export default LoanValidator;
