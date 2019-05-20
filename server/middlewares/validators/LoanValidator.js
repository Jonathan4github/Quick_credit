import db from '../../models/db';

class LoanValidator {  
  /**
   * Method for validating loan application
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object.
   */
  validateLoanApplication(req, res, next){
    const { amount, tenor } = req.body;
    let errorMessage = {};
    
    if(isNaN(amount) || (amount < 1000) || (amount > 10000000)) {
      errorMessage.amount = 'amount should be number & not less than 1000 or above 10000000';
    }
    if(isNaN(tenor) || tenor < 1 || tenor > 12){
      errorMessage.tenor = 'tenor should be number & not less than 1 or above 12';
    }
    const { status, id} = req.user.rows[0];

    if (status !== 'verified') {
      return res.status(400).send({
        status: 'Failed',
        error: 'You are not yet verified'
      });
    }
  
    const creatQuery = `SELECT * FROM loans WHERE userId = $1`;
    db.query(creatQuery, [id]).then(loan =>{
      if (loan.rows !== 0 && loan.rows[0].repaid == false) {        
        return res.status(400).send({
          status: 'Failed',
          error: `You cannot apply. You still have outstanding`
        })
      } 
    }).catch(e => (e));    

    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}

export default new LoanValidator;