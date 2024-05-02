import express from 'express';
import * as fundController from '../controllers/fund-controller.js';

const router = express.Router();

router.post('/', fundController.addFund);
router.get('/', fundController.getAllFunds);
router.put('/:id', fundController.updateFund);
router.delete('/:id', fundController.deleteFund);
router.get('/cause/:causeType', fundController.getFundsByCauseType);
router.put('/addsupportors/:id', fundController.addSupporterToFund);
router.get('/:id',fundController.getByID);
export default router;
