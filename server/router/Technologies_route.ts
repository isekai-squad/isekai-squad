import * as technologyController from "../controller/Technologies_controller";

const route = require("express").Router();

route.post("/Technology/:specialtyId", technologyController.addNewTechnology);
route.delete("/Technology", technologyController.deleteTechnology);
route.post("/Speciality", technologyController.addSpeciality);
route.delete("/Speciality", technologyController.deleteSpeciality);

route.get("/:specialtyId", technologyController.getAllTechno);
route.get("/Technology/:userId", technologyController.getUserTechno);
route.post("/user/Technology/:userId", technologyController.addUserTechnology);
route.get("/speciality/all",technologyController.getAllSpecialties)
route.get("/speciality/techno/:specialtyId",technologyController.getSpecialityTech)
route.post('/user/speciality/add',technologyController.addUserSpecialty)
export default route;
