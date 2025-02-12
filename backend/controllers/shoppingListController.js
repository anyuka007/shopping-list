import ShoppingList from "../models/ShoppingList.js";

export const getUsersLists = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("userId", userId);
        const usersLists = await ShoppingList.find({ user: userId });
        console.log("usersLists", usersLists);
        return res.send(usersLists);
    } catch (error) {
        res.status(500).send(
            error.message || "Error getting users shopping lists"
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
        if (isExist.length > 0) {
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
        console.log("listId", listId);
        res.status(200).send({ message: "list deleted" });
    } catch (error) {
        console.error("Error deleting shopping list: ", error);
        res.status(500).send({ message: "Error deleting shopping list" });
    }
};

export const editShoppingListsName = async (req, res) => {
    try {
        const listId = req.params.id;
        console.log("listId", listId);
        const { newName } = req.body;
        console.log("newName", newName);
        await ShoppingList.findByIdAndUpdate(listId, {
            title: newName,
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error renaming shopping list: ", error);
        res.status(500).send({ message: "Error renaming shopping list" });
    }
};

/* export const deleteItem = async (req, res) => {
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
}; */

/* export const editItem = async (req, res) => {
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
}; */
