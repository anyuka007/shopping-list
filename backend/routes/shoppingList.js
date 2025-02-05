import express from "express";
import {
    createShoppingList,
    getAllShoppingLists,
} from "../controllers/shoppingListController.js";
import { authorization } from "../middleware/authMiddleware.js";

const shoppingListRouter = express.Router();

shoppingListRouter
    .route("/")
    .get(getAllShoppingLists)
    .post(authorization, createShoppingList);

export default shoppingListRouter;
