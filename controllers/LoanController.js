import loanData from '../models/Loans';
import userData from '../models/Users';

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

  loanApplication(req, res) {
    const { tenor, amount } = req.body;
    const interest = (parseFloat(amount) * 5) / 100;
    const balance = parseFloat(amount) + interest;
    const payInstallment = (parseFloat(amount) + interest) / tenor;

    let newLoanApplication = {
      id: loanData.length + 1,
      tenor: tenor,
      amount: amount,
      payInstallment: payInstallment,
      status: 'pending',
      balance: balance,
      interest: interest
    }

    loanData.push(newLoanApplication);

    return res.status(200).json({
      status:200,
      data: {
        loanId: loanData[loanData.length -1].id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        tenor: tenor + ' months',
        amount: amount,
        payInstallment: payInstallment,
        status: 'pending',
        balance: balance,
        interest: interest
      }
    });
  }
  applicationStatus(req, res) {
    let { status } = req.body;
    const loan = loanData.find(loan => loan.id === parseInt(req.params.id, 10));
    loan.status = status;
    return res.status(200).json({
      status: 200,
      data: loan
    });
  }
}

export default new LoanController;