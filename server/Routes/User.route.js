import express from "express";
import { loginUser, logoutUser, registeruser } from "../Controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post("/register" , registeruser);
userRouter.post("/login" , loginUser);
userRouter.post("/logout" , logoutUser);

export default userRouter

