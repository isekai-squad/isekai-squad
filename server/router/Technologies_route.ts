import * as technologyController from "../controller/Technologies_controller"

const route = require("express").Router();


route.post("/Technology", technologyController.addNewTechnology)
route.delete("/Technology", technologyController.deleteTechnology);
route.post("/Speciality" , technologyController.addSpeciality)
route.delete("/Speciality", technologyController.deleteSpeciality);

export default route;