import express from "express";
import connect from "./lib/db.js";
import itemsRouter from "./routes/items.js";

await connect();
const app = express();
app.use(express.json());

app.use("/items", itemsRouter);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
