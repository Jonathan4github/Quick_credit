import loanData from '../models/Loans';
import { finished } from 'stream';

class LoanController {
  /**
   * Method to Get a specific loan application
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object loan.
   */

  fineOne(req, res) {
    const loan = loanData.find(loan => loan.id === parseInt(req.params.id, 10));
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'Loan with given id was not found'
      });
    }

    return res.status(200).json({
      status: 200,
      data: loan
    })
  }
}

export default new LoanController;