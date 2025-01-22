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

export const addItem = (req, res) => {
    console.log("test111");
    res.send("Add item");
};

export const editItem = (req, res) => {
    res.send("Edit item");
};

export const deleteItem = (req, res) => {
    res.send("Delete item");
};
