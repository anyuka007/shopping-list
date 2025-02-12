import express from "express";
import {
    getAllItems,
    getItem,
    addItem,
    editItem,
    deleteItem,
} from "../controllers/itemsController.js";
import { authorization } from "../middleware/authMiddleware.js";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(authorization, addItem);
itemsRouter
    .route("/:id")
    .get(getItem)
    .patch(authorization, editItem)
    .put(authorization, deleteItem);

export default itemsRouter;
