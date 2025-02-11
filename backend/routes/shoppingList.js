import express from "express";
import {
    addItemToShoppingList,
    createShoppingList,
    deleteShoppingList,
    getUsersLists,
} from "../controllers/shoppingListController.js";
import { authorization } from "../middleware/authMiddleware.js";

const shoppingListRouter = express.Router();

shoppingListRouter
    .route("/")
    .get(authorization, getUsersLists)
    .post(authorization, createShoppingList);

shoppingListRouter
    .route("/:id")
    .delete(authorization, deleteShoppingList)

    .post(authorization, addItemToShoppingList);
export default shoppingListRouter;
