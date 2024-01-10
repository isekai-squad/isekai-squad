import express from "express";
import * as categoryController from "../controller/Category";
const route = express.Router();

route.get('/' , categoryController.getAllCategory)
route.post('/' , categoryController.addCategory);
route.get('/:id' , categoryController.getAllPostsCategory)

export default route;