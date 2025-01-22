import mongoose from "mongoose";
import Category from "./Category.js";

const ItemSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Please add some text"] },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields);
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
