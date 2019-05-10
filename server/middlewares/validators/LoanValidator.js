import loanData from '../../models/Loans';

class LoanValidator {
  /**
   * Method for validating query parimeter
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object query.
   */

  static validateQueryParams(req, res, next) {
    /* check if query parimeter is empty  return all loan */
    const queryParimeters = req.query;
    if (Object.keys(queryParimeters).length === 0) {
      return next();
    }
    /**
     * get values from query parimenter
     */
    const loanStatus = queryParimeters.status;
    let loanRepaid = queryParimeters.repaid;
    if (loanRepaid === 'false') { loanRepaid = false; }
    if (loanRepaid === 'true') { loanRepaid = true; }
    /**
     * validate query parimeter if it has
     * object property of status and repaid else
     * throw an error message.
     */
    const errorMessage = {};
    if (!(loanRepaid === true || loanRepaid === false)) {
      errorMessage.repaid = 'repaid value is required & should be true or false';
    }
    if (!(loanStatus === 'approved' || loanStatus === 'pending' || loanStatus === 'rejected')) {
      errorMessage.status = 'status value is required & should be pending, approved, rejected';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(422).json(errorMessage);
    }
    return next();
  }

  /**
   * Method for validating loan application
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object.
   */
  static validateLoanApplication(req, res, next) {
    const { amount, tenor } = req.body;
    const errorMessage = {};

    if (isNaN(amount) || (amount < 1000) || (amount > 10000000)) {
      errorMessage.amount = 'amount should be number & not less than 1000 or above 10000000';
    }
    if (isNaN(tenor) || tenor < 1 || tenor > 12) {
      errorMessage.tenor = 'tenor should be number & not less than 1 or above 12';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(422).json(errorMessage);
    }
    return next();
  }

  static loanStatus(req, res, next) {
    const loanId = req.params.id;
    const isnum = /^\d+$/.test(loanId);
    const loandIdExist = loanData.find(loan => loan.id === parseInt(loanId, 10));
    if (!loandIdExist || isnum === false) {
      return res.status(404).json({
        status: 404,
        error: 'Invalid loan id'
      });
    }
    const { status } = req.body;
    if (!((status === 'approve') || (status === 'reject'))) {
      return res.status(422).json({
        status: 422,
        error: 'status required & should be approve or reject'
      });
    }
    return next();
  }
}

export default LoanValidator;
