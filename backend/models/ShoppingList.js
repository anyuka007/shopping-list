import mongoose from "mongoose";
import User from "./User.js";
import { ItemSchema } from "./Item.js";

const ShoppingListSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        // items: [{ type: mongoose.Schema.Types.ObjectId, ref: Item }],
        items: [ItemSchema],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
export default ShoppingList;
