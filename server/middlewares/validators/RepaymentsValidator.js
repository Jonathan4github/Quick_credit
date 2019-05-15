import loanData from '../../models/Loans';

class RepaymentsValidator {
  /**
  * Method for validating loan id
  * @static
  * @param {request} req
  * @param {response} res
  * @return {obj} return json object.
  */
  static validateLoanId(req, res, next) {
    const loanId = Number(req.params.id);
    const isnum = /^\d+$/.test(loanId);
    const loanIdExist = loanData.find(loan => loan.id === loanId);

    if (!loanIdExist || isnum === false) {
      return res.status(404).json({
        status: 404,
        error: 'Invalid loan id'
      });
    }
    return next();
  }

  static validateRepayment(req, res, next) {
    const loanId = parseInt(req.params.id, 10);
    const loan = loanData.find(loan => loan.id === loanId);
    if (loan.balance === 0) {
      return res.status(200).json({
        status: 200,
        error: 'Loan has been fully paid'
      });
    }
    return next();
  }
}

export default RepaymentsValidator;
