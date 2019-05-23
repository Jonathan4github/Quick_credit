import moment from 'moment';
import db from '../models/db'
import { parse } from 'url';

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
    const createQuery = `SELECT * FROM repayments WHERE loanid = $1`;
    db.query(createQuery, [loanId]).then(loans => {
      return res.status(200).send({
        status: 'Success',
        message: 'Repayments retrieve successfully',
        data: loans.rows
      });
    }).catch(e => (e));
  }

  static createRepayment(req, res) {
    const loanId = req.params.id;
    const createQuery = `SELECT * FROM loans WHERE   id= $1`;

    db.query(createQuery, [loanId]).then(loan => {
      let { id, paymentinstallment, total_due, balance, paid_amount } = loan.rows[0];

      const createQuery = `INSERT INTO repayments (loanid, amount, created_date, modified_date)
        VALUES ($1, $2, $3, $4) returning *`
      const values = [loanId, paymentinstallment, moment(new Date()), moment(new Date())];

      db.query(createQuery, values).then(repayment => {
        db.query(`SELECT SUM(amount) FROM repayments`).then(paidSum => {
          let paidAmount = paidSum.rows[0].sum;
          const balance = parseFloat(total_due) - parseFloat(paidAmount);

          let repaidStatus;
          balance == 0 ? repaidStatus = true : repaidStatus = false;

          const createQuery = `UPDATE loans SET paid_amount = $1, balance = $2, repaid=$3, modified_date=$4 WHERE id = $5`;
          const values = [paidAmount, balance, repaidStatus, moment(new Date()), loanId];

          db.query(createQuery, values).then(loan => {
            return res.status(201).json({
              status: 'Success',
              message: 'Repayment transaction was successfull',
              data: repayment.rows[0],
              LoanData: {
                monthlyInstallment: paymentinstallment,
                total_due,
                paid_amount: paidAmount,
                balance
              }
            })
          })
        })
      }).ca
    }).catch((e) => e);
  }

}

export default RepaymentsContoller;