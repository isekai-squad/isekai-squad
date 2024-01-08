import express from "express";
import * as Technologies_controller from "../controller/Technologies_controller";
const technologiesRouter = express.Router();
technologiesRouter.get("/", Technologies_controller.getAllTechno);
technologiesRouter.delete("/:id", Technologies_controller.deleteTechnology);
technologiesRouter.post("/:id", Technologies_controller.addNewTechnology);
technologiesRouter.post("/user/:id", Technologies_controller.addUserTechnology);

export default technologiesRouter;


