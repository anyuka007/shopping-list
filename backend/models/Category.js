import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please add some text"] },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
