import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).send(categories);
    } catch (error) {
        return res
            .status(500)
            .send(error.message || "Error fetching all categories");
    }
};

export const getCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        if (!category) {
            console.log("Category not found".red);
            return res.status(404).send("Category not found");
        }
        return res.status(200).send(category);
    } catch (error) {
        return res
            .status(500)
            .send(error.message || "Error fetching one category");
    }
};

export const addCategory = async (req, res) => {
    try {
        const body = req.body;

        // Check if the body or the name field is missing
        if (!body || !body.name) {
            console.log("Name is required".red);
            return res.status(400).send("Name is required");
        }

        // check if such a category exists:
        const isExist = await Category.findOne({
            name: body.name.toLowerCase(),
        });
        if (isExist) {
            return res.status(409).send("There is already such a category");
        }

        // Create a new category in the database with the provided body
        const newCategory = await Category.create({
            name: body.name.toLowerCase(),
        });
        console.log(`New category '${body.name}' successfully added`);
        return res.status(200).send(newCategory);
    } catch (error) {
        console.log(`Error adding new category: ${error}`);
        return res
            .status(500)
            .send(error.message || "Error fetching one category");
    }
};
