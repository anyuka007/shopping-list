import express from "express";
import connect from "./lib/db.js";
import itemsRouter from "./routes/items.js";
import categoriesRouter from "./routes/categories.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import shoppingListRouter from "./routes/shoppingList.js";
import cors from "cors";

await connect();
const app = express();
app.use(express.json());
app.use(
    cors({
        //origin: "http://localhost:5173",
        origin: ["https://ap-shoppinglist.onrender.com", "http://localhost:5173"], 
        credentials: true,
    })
);

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/shoppinglist", shoppingListRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
