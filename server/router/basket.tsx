import { Router } from 'express';
import * as basketController from "../controller/Basket.ts"
const router = Router();

router.post("/:userId/:itemId", basketController.addToBasket)
router.get("/:id", basketController.getBasket)
router.delete("/:idUser/:idItem", basketController.deleteBasket)

export default router