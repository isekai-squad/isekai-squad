import * as reportsController from "../controller/Reports_controller"

const route = require("express").Router()

route.get("/" , reportsController.getAllreport)
route.get("/:userId" , reportsController.getAllreportOneUser)
route.post("/:userId", reportsController.addreport)

export default route;