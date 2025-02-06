import express from "express";
import {
    addItemToShoppingList,
    createShoppingList,
    getAllShoppingLists,
} from "../controllers/shoppingListController.js";
import { authorization } from "../middleware/authMiddleware.js";

const shoppingListRouter = express.Router();

shoppingListRouter
    .route("/")
    .get(getAllShoppingLists)
    .post(authorization, createShoppingList);

shoppingListRouter.route("/:id").post(authorization, addItemToShoppingList);
export default shoppingListRouter;
