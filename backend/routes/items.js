import express from "express";
import {
    getAllItems,
    getItem,
    addItem,
    editItem,
    deleteItem,
} from "../controllers/itemsController.js";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(addItem);
itemsRouter.route("/:id").get(getItem).patch(editItem).delete(deleteItem);

export default itemsRouter;
