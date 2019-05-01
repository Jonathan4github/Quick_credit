import repaymentsData from '../models/Repayments';

class RepaymentsContoller {
  /**
   * Method to Get a specific loan repayments history
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object repayments.
   */
  getRepayments(req, res, next) {
    let loanId = parseInt(req.params.id, 10);
    let result = [];

    let repayments = repaymentsData.filter((repayment) => {
      if (repayment.loanId == loanId) {
        result.push(repayment);
      }
    });

    if (result.length == 0) {
      return res.status(200).json({
        status: 200,
        data: 'Loan with the given id has no repayments history'
      });
    }
    return res.status(200).json({
      status: 200,
      data: result
    });
  }
}

export default new RepaymentsContoller;