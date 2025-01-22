import Item from "../models/Item.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).send(items);
    } catch (error) {
        return res.status(500).send(error.message || "Server Error");
    }
};

export const getItem = (req, res) => {
    res.send("Get one item");
};

export const addItem = async (req, res) => {
    try {
        const { name, category } = req.body;
        if (!name || !category) {
            return res.status(400).send("Please add all info");
        }
        const isItemInDB = await Item.findOne({
            name: name.toLowerCase(),
            category: category.toLowerCase(),
        });
        if (isItemInDB) {
            return res.status(409).send("There is already such an item");
        }

        const newItem = await Item.create({
            name: name.toLowerCase(),
            category: category.toLowerCase(),
        });
        return res
            .status(200)
            .send(`New Item ${newItem.name} was successfuly added.`);
    } catch (error) {
        return res.status(500).send(error.message || "Error adding new item");
    }
};

export const editItem = (req, res) => {
    res.send("Edit item");
};

export const deleteItem = (req, res) => {
    res.send("Delete item");
};
