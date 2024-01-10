import { Router } from 'express';
import * as basketController from "../controller/Basket"
const router = Router();

router.post("/:idUser/:idItem", basketController.addToBasket)
router.get("/:id", basketController.getBasket)
router.delete("/:idUser/:idItem", basketController.deleteBasket)

export default router