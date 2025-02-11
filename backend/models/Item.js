import mongoose from "mongoose";
import Category from "./Category.js";

export const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    /* category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true,
    }, */
    isChecked: { type: Boolean, default: false },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
