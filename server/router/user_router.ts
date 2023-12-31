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
} from "../controller/user_controller";

userRoutes.get("/users", getAllUser);
userRoutes.get("/user/:id", getUser);
userRoutes.post("/user/create", createUser);
userRoutes.post("/user/signin", SignIn);
userRoutes.put("/user/update/:userId", updateUser);
userRoutes.post("/user/forgotPassword", forgotPass);
userRoutes.post("/user/forgotPassword/code", SubmitForgotPassword);
userRoutes.post("/user/changePassword", ChangePassword);
