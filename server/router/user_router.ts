import express from "express";
export const userRoutes = express.Router();
import { createUser, SignIn, updateUser } from "../controller/user_controller";

userRoutes.post('/user/create',createUser);
userRoutes.post('/user/signin',SignIn);
userRoutes.put('/user/update/:userId',updateUser);
