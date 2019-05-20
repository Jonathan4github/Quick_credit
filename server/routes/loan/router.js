import express from 'express';
import LoanController from '../../controllers/LoanController';
import LoanValidator from '../../middlewares/validators/LoanValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';
import validId from '../../middlewares/validators/validateId';

const router = express.Router();
const { findOne, loanApplication, sortRepaidLoan } = LoanController;
const { validateLoanApplication, validateQueryParams } = LoanValidator;
const { verifyToken } = Auth;

router.route('/loans/:id')
  .get(verifyToken, isAdmin, validId, findOne);
router.route('/loans/')
  .post(verifyToken, validateLoanApplication, loanApplication)
  .get(verifyToken, isAdmin, validateQueryParams, sortRepaidLoan);

export default router;
