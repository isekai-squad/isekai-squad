import * as technologyController from "../controller/Technologies_controller";

const route = require("express").Router();

route.post("/Technology/:specialtyId", technologyController.addNewTechnology);
route.delete("/Technology", technologyController.deleteTechnology);
route.post("/Speciality", technologyController.addSpeciality);
route.delete("/Speciality", technologyController.deleteSpeciality);
route.post("/Project/:id" , technologyController.addProjectTechnology);

route.get("/:specialtyId", technologyController.getAllTechno);
route.get("/Technology/:userId", technologyController.getUserTechno);
route.post("/user/Technology/:userId", technologyController.addUserTechnology);
export default route;
