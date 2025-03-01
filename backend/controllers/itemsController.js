//import Item from "../models/Item.js";
import ShoppingList from "../models/ShoppingList.js";

/* export const addItem = async (req, res) => {
    try {
        const { name, category } = req.body;
        if (!name || !category) {
            return res.status(400).send("Please add all info");
        }
        const isItemInDB = await Item.findOne({
            name: name.toLowerCase(),
            //category: category.toLowerCase(),
        });
        if (isItemInDB) {
            return res.status(409).send("There is already such an item");
        }

        const newItem = await Item.create({
            name: name.toLowerCase(),
            //category: category.toLowerCase(),
        });
        return res
            .status(200)
            .send(`New Item ${newItem.name} was successfuly added.`);
    } catch (error) {
        return res.status(500).send(error.message || "Error adding new item");
    }
}; */

// Editing Item in Shopping list Name and Checkbox state
export const editItem = async (req, res) => {
    try {
        const listId = req.params.id;
        const { itemIndex, newName, isChecked } = req.body;
        const shoppingList = await ShoppingList.findById(listId);
        
        const itemToUpdate = shoppingList.items[itemIndex];
        // Editing the name
        if (typeof newName !== "undefined") {
            itemToUpdate.name = newName;
        }
        // Changing checkbox state
        if (typeof isChecked !== "undefined") {
            itemToUpdate.isChecked = isChecked;
        }

        // Updating actual item by replacing it with a ew one
        shoppingList.items.splice(itemIndex, 1, itemToUpdate);

        await shoppingList.save();
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error editing item: ", error);
        res.status(500).send({ message: "Error editing item" });
    }
};

// Deleting Item in Shopping List
export const deleteItem = async (req, res) => {
    try {
        const listId = req.params.id;
        const { itemIndex } = req.body;
        const shoppingList = await ShoppingList.findById(listId);
        shoppingList.items.splice(itemIndex, 1);
        await shoppingList.save();
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error deleting item: ", error);
        res.status(500).send({ message: "Error deleting item" });
    }
};
