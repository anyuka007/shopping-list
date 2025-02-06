import ShoppingList from "../models/ShoppingList.js";

export const getAllShoppingLists = async (req, res) => {
    try {
        const allLists = await ShoppingList.find();
        res.status(200).send(allLists);
    } catch (error) {
        res.status(500).send(
            error.message || "Error getting all shopping lists"
        );
    }
};

export const createShoppingList = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("userID from request", userId._id);
        const { title } = req.body;
        const isExist = await ShoppingList.find({
            title: title,
            user: userId,
        });
        console.log("isExist", isExist);
        if (isExist) {
            console.log("list exists");
            return res
                .status(409)
                .send({ message: "List with such title exists" });
        }
        const newList = await ShoppingList.create({ title, user: userId });
        console.log("new List", newList);
        res.status(200).send(newList);
    } catch (error) {
        res.status(500).send(
            error.message || "Error getting all shopping lists"
        );
    }
};

export const addItemToShoppingList = async (req, res) => {
    try {
        const listId = req.params.id;
        console.log("listID", listId);
        const { name } = req.body;
        console.log("new Item", name);

        // Find the shopping list by ID
        const shoppingList = await ShoppingList.findById(listId);
        if (!shoppingList) {
            return res.status(404).send({ message: "Shopping list not found" });
        }
        const newItem = { name };
        // Add the new item to the items array
        shoppingList.items.push(newItem);

        // Save the updated shopping list
        await shoppingList.save();

        res.status(200).send(shoppingList);
    } catch (error) {
        console.error("Error adding item to shopping list:", error);
        res.status(500).send({ message: "Error adding new item" });
    }
};
