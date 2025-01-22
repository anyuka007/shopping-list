import express from "express";
import { getAllShoppingLists } from "../controllers/shoppingListController.js";

const shoppingListRouter = express.Router();

shoppingListRouter.route("/").get(getAllShoppingLists);

export default shoppingListRouter;
