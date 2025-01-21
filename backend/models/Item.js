import mongoose from "mongoose";
import Category from "./Category.js";

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please add some text"] },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
