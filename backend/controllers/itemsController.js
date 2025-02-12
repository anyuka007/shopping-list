import Item from "../models/Item.js";
import ShoppingList from "../models/ShoppingList.js";

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

export const editItem = async (req, res) => {
    try {
        const listId = req.params.id;
        const { itemIndex, newName, isChecked } = req.body;
        const shoppingList = await ShoppingList.findById(listId);
        console.log("listToUpdate", shoppingList.title);
        console.log("itemToUpdate", shoppingList.items[itemIndex].name);

        const itemToUpdate = shoppingList.items[itemIndex];
        if (typeof newName !== "undefined") {
            itemToUpdate.name = newName;
        }
        if (typeof isChecked !== "undefined") {
            itemToUpdate.isChecked = isChecked;
        }

        shoppingList.items.splice(itemIndex, 1, itemToUpdate);
        await shoppingList.save();
        //console.log("updatedList", shoppingList);
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error editing item: ", error);
        res.status(500).send({ message: "Error editing item" });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const listId = req.params.id;
        const { itemIndex } = req.body;
        const shoppingList = await ShoppingList.findById(listId);
        //console.log("listToUpdate", shoppingList.title);
        shoppingList.items.splice(itemIndex, 1);
        await shoppingList.save();
        //console.log("updatedList", shoppingList);
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error deleting item: ", error);
        res.status(500).send({ message: "Error deleting item" });
    }
};
