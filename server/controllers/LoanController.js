import db from '../models/db';
import moment from 'moment';

class LoanController {
  /**
   * Method to Get a specific loan application
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object loan.
   */

  static findOne(req, res) {
    const loanId = req.params.id;
    const createQuery = `SELECT * FROM loans WHERE id = $1`;
    db.query(createQuery, [loanId]).then(loan => {
      if (loan.rowCount === 0) {
        return res.status(404).send({
          status: 'Failed',
          error: 'Loan with the given id not found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Loan retrieved successfully',
        data: loan.rows
      })
    }).catch(e => (e));
  }

  static getUserLoan(req, res) {
    const userId = req.user.rows[0].id;;
    const createQuery = `SELECT * FROM loans WHERE userId = $1`;

    db.query(createQuery, [userId]).then(loan =>{

      if (loan.rowCount === 0) {
        return res.status(404).send({
          status: 'Failed',
          error: 'Loan with the given id not found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        message: 'Loan retrieved successfully',
        data: loan.rows
      });
    }).catch(e => (e));
  }

  static loanApplication(req, res) {
    const { tenor, amount } = req.body;
    const interest = (parseFloat(amount) * 5) / 100;
    const balance = parseFloat(amount) + interest;
    const payInstallment = (parseFloat(amount) + interest) / tenor;
    const total_due = balance;

    const createQuery =
      `INSERT INTO loans (userId, tenor, amount, balance, interest, paymentinstallment, total_due, created_date, modified_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

    const values = [req.user.rows[0].id, tenor, amount, balance, interest, payInstallment, total_due, moment(new Date()), moment(new Date())];

    db.query(createQuery, values).then(loan => {
      const { firstname, lastname, email } = req.user.rows[0];
      const { id, tenor, amount, paymentinstallment, status, balance, interest } = loan.rows[0];
      return res.status(200).json({
        status: 'Success',
        message: 'Loan apply successfully',
        data: {
          loanId: id,
          firstname,
          lastname,
          email,
          tenor: tenor + ' months',
          amount,
          paymentinstallment,
          status,
          balance,
          interest
        }
      });
    }).catch(e => (e))
  }
  static sortRepaidLoan(req, res) {
    let queryParimeters = req.query;
    /**
     * check if query parimeter is empty
     * return all loan
     */
    if (Object.keys(queryParimeters).length === 0) {
      const createQuery = `SELECT * FROM loans`;
      db.query(createQuery).then(loans => {
        return res.status(200).send({
          status: 'Success',
          message: 'Loans retrieved Succefully',
          data: loans.rows
        })
      }).catch((e) => e)
    }
    let loanStatus = queryParimeters['status'];
    let loanRepaid = queryParimeters['repaid'];

    const createQuery = `SELECT * FROM loans WHERE status = $1 and repaid = $2`;
    const values = [loanStatus, loanRepaid];
    db.query(createQuery, values).then(loans => {
      return res.status(200).send({
        status: 'Success',
        message: 'Loans retrieved Succefully',
        data: loans.rows
      })
    }).catch((e) => e)
  }
  static applicationStatus(req, res) {
    const { status } = req.body;
    const loanId = req.params.id;

    const createQuery = `UPDATE loans SET status = $1, modified_date=$2 WHERE id = $3`;
    const values = [status, moment(new Date()), loanId];
    db.query(createQuery, values).then(loan => {
      const createQuery = `SELECT * FROM loans WHERE id = $1`;
      db.query(createQuery, [loanId]).then(loan => {
        return res.status(200).json({
          status: 'Success',
          message: `Loan has been ${status} successfully`,
          data: loan.rows[0]
        });
      });
    }).catch((e) => e);
  }
}

export default LoanController;
