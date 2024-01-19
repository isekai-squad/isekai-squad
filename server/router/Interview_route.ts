import express from 'express';
import * as interviewController from "../controller/Interview_controller"
const route = express.Router();

route.post('/:studentId/:companyId' , interviewController.addInterview)
route.get('/:studentId' , interviewController.getInterviewStudent)
route.get ('/:companyId' , interviewController.getInterviewCompany)
route.put('/:companyId' , interviewController.updateInterviewCompany)
route.delete('/:companyId' , interviewController.deleteInterviewCompany)
route.delete('/:studentId' , interviewController.deleteInterviewStudent)

export default route