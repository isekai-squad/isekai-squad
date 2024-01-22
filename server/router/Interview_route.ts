import express from 'express';
import * as interviewController from "../controller/Interview_controller"
const route = express.Router();

route.get ('/:receiver' , interviewController.getInterview)
route.put('/:id' , interviewController.updateInterview)
route.delete('/:receiver' , interviewController.deleteInterviewCompany)
route.delete('/:receiver' , interviewController.deleteInterviewStudent)
route.post('/RequestCompany/:studentId/:companyId' , interviewController.sendEmailCompany)
route.post('/RequestStudent/:studentId/:companyId' , interviewController.sendEmailStudent)

export default route