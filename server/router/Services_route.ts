import * as ServicesController from "../controller/Services_controller"

const route = require("express").Router()

route.get("/", ServicesController.getAllServices)
route.get("/:userId", ServicesController.getAllServicesOneUser)
route.post("/:userId", ServicesController.addService)
route.delete("/:userId/:serviceId", ServicesController.deleteService)
route.put("/:userId/:serviceId" , ServicesController.updateService)

export default route;