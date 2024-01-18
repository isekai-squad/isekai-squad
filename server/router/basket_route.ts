import { Router } from 'express';
import * as basketController from "../controller/Basket"
const router = Router();

router.post("/:userId/:serviceId", basketController.addToBasket)
router.get("/:id", basketController.getBasket)
router.get("/:idUser", basketController.getBayBasket)
router.patch("/payedBasket", basketController.payedBasket)
router.delete("/:idUser/:idItem", basketController.deleteBasket)

export default router