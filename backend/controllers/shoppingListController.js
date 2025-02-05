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
