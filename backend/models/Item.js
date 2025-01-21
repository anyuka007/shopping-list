import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please add some text"] },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
