import db from '../models/db';

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
    db.query(createQuery, [loanId], (error, loan) => {
      if(error) {
        return res.status(500).send({
          status: 'Failed',
          error: error.message
        });
      }
      if (loan.rowCount === 0){
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
    });
  }
}

export default LoanController;