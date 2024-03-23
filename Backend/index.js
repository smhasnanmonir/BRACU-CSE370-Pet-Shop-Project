import express from "express";
import userRouter from "./routes/users.js";
import productsRoutes1 from "./routes/products.js";
import hospitalRoutes1 from "./routes/hospitals.js";
import postRouter1 from "./routes/userPost.js";

const app = express();
const port = 8080;
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", productsRoutes1);
app.use("/api", hospitalRoutes1);
app.use("/api", postRouter1);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { port };
