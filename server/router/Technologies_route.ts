import * as technologyController from "../controller/Technologies_controller";

const route = require("express").Router();

route.get("/", technologyController.getAllTechno);
route.post("/user/:id", technologyController.addUserTechnology);
route.post("/Technology", technologyController.addNewTechnology);
route.delete("/Technology", technologyController.deleteTechnology);
route.post("/Speciality", technologyController.addSpeciality);
route.delete("/Speciality", technologyController.deleteSpeciality);
route.post("/Project/:id" , technologyController.addProjectTechnology);

export default route;
