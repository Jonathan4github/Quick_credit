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
    }).catch(e=>(e));
  }

  static createRepayment(req, res) {
    const loanId = req.params.id;
    const createQuery = `SELECT * FROM loans WHERE   id= $1`;

    db.query(createQuery, [loanId]).then(loan => {
      let { paymentinstallment, total_due, balance, paid_amount } = loan.rows[0];

      const createQuery = `INSERT INTO repayments (loanid, amount, created_date, modified_date)
        VALUES ($1, $2, $3, $4) returning *`
      const values = [loanId, paymentinstallment, moment(new Date()), moment(new Date())];

      db.query(createQuery, values).then(repayment => {
        paid_amount = parseFloat(paid_amount);
        paymentinstallment = parseFloat(paymentinstallment);
        total_due = parseFloat(total_due);

        paid_amount += paymentinstallment;
        const loanBalance = total_due - paid_amount

        let repaidStatus;
        balance == 0? repaidStatus = true: false;

        const createQuery = `UPDATE loans SET paid_amount = $1, balance = $2, repaid=$3, modified_date=$4 WHERE id = $5`;
        const values = [paid_amount, loanBalance, repaidStatus, moment(new Date()), loanId];

        db.query(createQuery, values).then(loan => {
          console.log(paid_amount);
          return res.status(201).json({
            data: repayment.rows[0]
          })
        }).catch(e => (e));
      }).catch((e) => e)
    }).catch((e) => e);
  }

}

export default RepaymentsContoller;