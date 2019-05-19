import express from 'express';
import LoanController from '../../controllers/LoanController';

const router = express.Router();

router.route('/loans/:id')
  .get(LoanController.findOne);

export default router;
