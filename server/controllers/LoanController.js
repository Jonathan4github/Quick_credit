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

  static fineOne(req, res) {
    const loan = loanData.find(loans => loans.id === parseInt(req.params.id, 10));
    return res.status(200).json({
      status: 200,
      message: 'Retrieve successfull',
      data: loan
    });
  }

  static sortRepaidLoan(req, res) {
    const queryParimeters = req.query;

    if (Object.keys(queryParimeters).length === 0) {
      return res.status(200).json({
        status: 200,
        data: loanData
      });
    }

    const loanStatus = queryParimeters.status;
    let loanRepaid = queryParimeters.repaid;
    if (loanRepaid === 'false') { loanRepaid = false; }
    if (loanRepaid === 'true') { loanRepaid = true; }
    const sortedData = [];
    
    const sortLoan = loanData.filter((loan) => {
      if (loan.status === loanStatus && loan.repaid === loanRepaid) {
        sortedData.push(loan);
      }
    });
    return res.status(200).json({
      status: 200,
      message: 'Retrieve successful',
      data: sortedData
    });
  }

  static loanApplication(req, res) {
    const { tenor, amount } = req.body;
    const interest = (parseFloat(amount) * 5) / 100;
    const balance = parseFloat(amount) + interest;
    const payInstallment = (parseFloat(amount) + interest) / tenor;

    const newLoanApplication = {
      id: loanData.length + 1,
      tenor,
      amount,
      payInstallment,
      status: 'pending',
      totalDue: balance,
      balance,
      interest,
      repaid: false
    };

    loanData.push(newLoanApplication);

    return res.status(201).json({
      status: 201,
      message: 'Loan application was successful',
      data: {
        loanId: loanData[loanData.length - 1].id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        tenor: `${tenor} months`,
        amount,
        payInstallment,
        status: 'pending',
        totalDue: balance,
        balance,
        interest
      }
    });
  }

  static applicationStatus(req, res) {
    const { status } = req.body;
    const loan = loanData.find(loans => loans.id === parseInt(req.params.id, 10));
    loan.status = status;
    return res.status(200).json({
      status: 200,
      message: 'Loan status was updated successful',      
      data: loan
    });
  }
}

export default LoanController;
