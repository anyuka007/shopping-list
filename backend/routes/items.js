import express from "express";
import {
    //addItem,
    editItem,
    deleteItem,
} from "../controllers/itemsController.js";
import { authorization } from "../middleware/authMiddleware.js";

const itemsRouter = express.Router();

//itemsRouter.route("/").post(authorization, addItem);
itemsRouter
    .route("/:id")
    .patch(authorization, editItem)
    .put(authorization, deleteItem);

export default itemsRouter;
