import loanData from '../models/Loans';

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

  sortRepaidLoan(req, res) {
    let queryParimeters = req.query;
    /**
     * check if query parimeter is empty
     * return all loan
     */
    if (Object.keys(queryParimeters).length === 0) {
      return res.status(200).json({
        status: 200,
        data: loanData
      });
    }

    //get query parimeters value
    let loanStatus = queryParimeters['status'];
    let loanRepaid = queryParimeters['repaid'];
    if (loanRepaid == 'false') { loanRepaid = false }
    if (loanRepaid == 'true') { loanRepaid = true }    
    let sortedData = [];
    // sort loan
    let sortLoan = loanData.filter((loan) => {
      if (loan.status == loanStatus && loan.repaid == loanRepaid) {
        sortedData.push(loan);
      }
    })
    return res.status(200).json({
      status: 200,
      data: sortedData
    });
  }
}

export default new LoanController;