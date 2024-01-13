import express from 'express';
import * as stripeController from "../controller/Payment"
const router = express.Router();

router.post("/intents", stripeController.payment)
router.post("/validPayment", stripeController.validPayment)

    
export default router