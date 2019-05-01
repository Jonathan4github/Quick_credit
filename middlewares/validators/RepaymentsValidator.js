import loanData from '../../models/Loans';

class RepaymentsValidator {
  /**
  * Method for validating loan id
  * @static
  * @param {request} req
  * @param {response} res
  * @return {obj} return json object.
  */
  validateLoanId(req, res, next) {
    let loanId = parseInt(req.params.id, 10);
    let loandIdExist = loanData.find(loan => loan.id === loanId);

    if (!loandIdExist) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid loan id'
      })
    }
    return next();
  }
}

export default new RepaymentsValidator;