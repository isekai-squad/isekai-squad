import { Router } from 'express';
import * as favoriteController from '../controller/Favoirit'

 const route=Router()

route.get("/:iduser", favoriteController.getFavorite);
route.post("/:idItem/:iduser", favoriteController.addFav);
route.delete("/:iditem/:iduser", favoriteController.removeFav);


export default route