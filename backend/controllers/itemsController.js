import Item from "../models/Item.js";

export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        return res.status(200).send(items);
        /* return res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        }); */
    } catch (error) {
        return res.status(500).send(error.message || "Server Error");
        /* return res.status(500).json({
            success: false,
            error: error.message || "Server Error",
        }); */
    }
};

export const getItem = (req, res, next) => {
    res.send("Get one item");
};

export const addItem = (req, res, next) => {
    res.send("Add item");
};

export const editItem = (req, res, next) => {
    res.send("Edit item");
};

export const deleteItem = (req, res, next) => {
    res.send("Delete item");
};
