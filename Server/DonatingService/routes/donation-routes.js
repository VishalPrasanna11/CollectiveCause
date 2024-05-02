import express from 'express';
import * as DonationController from "../controllers/donation-controller"

const router = express.Router();

router.post('/', DonationController.addDonations);
router.get('/:email', DonationController.getDonationsByEmail);
export default router;
