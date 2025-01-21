import express from "express";
import connect from "./lib/db.js";
import itemsRouter from "./routes/items.js";
import categoriesRouter from "./routes/categories.js";

await connect();
const app = express();
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
