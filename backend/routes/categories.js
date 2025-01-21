import express from "express";
import {
    addCategory,
    getAllCategories,
    getCategory,
} from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(getAllCategories).post(addCategory);
categoriesRouter.route("/:id").get(getCategory);

export default categoriesRouter;
