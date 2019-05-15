import moment from 'moment';
import repaymentsData from '../models/Repayments';
import loanData from '../models/Loans';

class RepaymentsContoller {
  /**
   * Method to Get a specific loan repayments history
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object repayments.
   */
  static getRepayments(req, res) {
    const loanId = parseInt(req.params.id, 10);
    const result = [];

    const repayments = repaymentsData.filter((repayment) => {
      if (repayment.loanId === loanId) {
        return result.push(repayment);
      }
    });

    if (result.length === 0) {
      return res.status(200).json({
        status: 200,
        data: 'Loan with the given id has no repayments history'
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Retrieve repayments successful',
      data: result
    });
  }

  static createRepayment(req, res) {
    const loanId = parseInt(req.params.id, 10);
    const loan = loanData.find(loan => loan.id === loanId);
    const amount = parseFloat(loan.amount);
    const { payInstallment } = loan;
    let paidAmount = payInstallment;

    const repayments = repaymentsData.map((repayment) => {
      repayment.loanId == loanId ? paidAmount += repayment.amount : null;
    });

    const repayment = {
      id: repaymentsData.length + 1,
      loanId,
      createdOn: moment(new Date()),
      amount: payInstallment
    };

    repaymentsData.push(repayment);

    const balance = loan.totalDue - paidAmount;
    loan.balance = balance;
    
    loan.balance === 0? loan.repaid = true: false;
    return res.status(201).json({
      status: 201,
      message: 'Repayment transaction was succesful',
      id: repaymentsData.length + 1,
      createdOn: moment(new Date()),
      loanId,
      amount,
      totalDue: loan.totalDue,
      monthlyInstallment: payInstallment,
      paidAmount,
      balance
    });
  }
}

export default RepaymentsContoller;
