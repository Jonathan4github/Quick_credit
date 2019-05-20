import express from 'express';
import LoanController from '../../controllers/LoanController';
import LoanValidator from '../../middlewares/validators/LoanValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';
import validId from '../../middlewares/validators/validateId';

const router = express.Router();
const {
  findOne, loanApplication, sortRepaidLoan, applicationStatus
} = LoanController;
const { validateLoanApplication, validateQueryParams, loanStatus } = LoanValidator;
const { verifyToken } = Auth;

router.route('/loans/:id')
  .get(verifyToken, isAdmin, validId, findOne)
  .patch(verifyToken, isAdmin, validId, loanStatus, applicationStatus);
router.route('/loans/')
  .post(verifyToken, validateLoanApplication, loanApplication)
  .get(verifyToken, isAdmin, validateQueryParams, sortRepaidLoan);

export default router;
