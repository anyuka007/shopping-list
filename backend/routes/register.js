import express from "express";
import { addNewUser } from "../controllers/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/", addNewUser);

export default registerRouter;
