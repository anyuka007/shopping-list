import ShoppingList from "../models/ShoppingList.js";

export const getUsersLists = async (req, res) => {
    try {
        const userId = req.user._id;
        const usersLists = await ShoppingList.find({ user: userId });
        return res.send(usersLists);
    } catch (error) {
        res.status(500).send(
            error.message || "Error getting users shopping lists"
        );
    }
};

export const getList = async (req, res) => {
    try {
        const listId = req.params.id;

        // Find the shopping list by ID
        const shoppingList = await ShoppingList.findById(listId);
        if (!shoppingList) {
            return res.status(404).send({ message: "Shopping list not found" });
        }

        res.status(200).send(shoppingList);
    } catch (error) {
        console.error("Error fetching shopping list:", error);
        res.status(500).send({ message: "Error fetching list" });
    }
};

export const createShoppingList = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title } = req.body;
        const isExist = await ShoppingList.find({
            title: title,
            user: userId,
        });
        if (isExist.length > 0) {
            return res
                .status(409)
                .send({ message: "List with such title exists" });
        }
        const newList = await ShoppingList.create({ title, user: userId });
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
        const { name } = req.body;

        // Find the shopping list by ID
        const shoppingList = await ShoppingList.findById(listId);
        if (!shoppingList) {
            return res.status(404).send({ message: "Shopping list not found" });
        }
        if (shoppingList.items.some((item) => item.name === name)) {
            return res
                .status(409)
                .send({ message: "There is already such item in list" });
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

export const deleteShoppingList = async (req, res) => {
    try {
        const listId = req.params.id;
        await ShoppingList.findByIdAndDelete(listId);
        res.status(200).send({ message: "list deleted" });
    } catch (error) {
        console.error("Error deleting shopping list: ", error);
        res.status(500).send({ message: "Error deleting shopping list" });
    }
};

export const editShoppingListsName = async (req, res) => {
    try {
        const listId = req.params.id;
        const { newName } = req.body;
        await ShoppingList.findByIdAndUpdate(listId, {
            title: newName,
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error renaming shopping list: ", error);
        res.status(500).send({ message: "Error renaming shopping list" });
    }
};
