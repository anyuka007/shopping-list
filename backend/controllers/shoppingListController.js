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
