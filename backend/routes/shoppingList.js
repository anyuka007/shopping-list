import express from "express";
import {
    addItemToShoppingList,
    createShoppingList,
    /* deleteItem,
    editItem, */
    deleteShoppingList,
    editShoppingListsName,
    getList,
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
    .get(authorization, getList)
    .delete(authorization, deleteShoppingList)
    .post(authorization, addItemToShoppingList)
    .patch(authorization, editShoppingListsName);
/* .put(authorization, deleteItem)
    .patch(authorization, editItem); */
export default shoppingListRouter;
