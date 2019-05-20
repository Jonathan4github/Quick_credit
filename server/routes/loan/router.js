import express from 'express';
import LoanController from '../../controllers/LoanController';
import LoanValidator from '../../middlewares/validators/LoanValidator';
import Auth from '../../middlewares/Auth';
import isAdmin from '../../middlewares/isAdmin';
import validId from '../../middlewares/validators/validateId';

const router = express.Router();
const { findOne, loanApplication } = LoanController;
const { validateLoanApplication } = LoanValidator;
const { verifyToken } = Auth;

router.route('/loans/:id')
  .get(verifyToken, isAdmin, validId, findOne);
router.route('/loans')
  .post(verifyToken, validateLoanApplication, loanApplication);

export default router;
