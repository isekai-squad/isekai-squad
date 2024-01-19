import express from "express";
export const userRoutes = express.Router();
import {
  createUser,
  SignIn,
  updateUser,
  forgotPass,
  SubmitForgotPassword,
  ChangePassword,
  getUser,
  getAllUser,
  checkEmail,
  CompanyCreate,
  getStudentProfile,
  getCompanyProfile,
  getAdvisorProfile,
  findUser
} from "../controller/user_controller";

userRoutes.post("/users", getAllUser);
userRoutes.get("/users/company", getCompanyProfile);
userRoutes.get("/users/students", getStudentProfile);
userRoutes.get("/users/advisor", getAdvisorProfile);
userRoutes.get("/user/:id", getUser);
userRoutes.post("/user/create", createUser);
userRoutes.post("/user/signin", SignIn);
userRoutes.put("/user/update/:userId", updateUser);
userRoutes.post("/user/forgotPassword", forgotPass);
userRoutes.post("/user/forgotPassword/code", SubmitForgotPassword);
userRoutes.post("/user/changePassword", ChangePassword);
userRoutes.get("/user/email/:email", checkEmail);
userRoutes.post("/company/create", CompanyCreate);
userRoutes.post('/user/find',findUser)