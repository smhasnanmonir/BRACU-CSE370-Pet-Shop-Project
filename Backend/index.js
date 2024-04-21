import express from "express";
import userRouter from "./routes/users.js";
import productsRoutes1 from "./routes/products.js";
import hospitalRoutes1 from "./routes/hospitals.js";
import postRouter1 from "./routes/userPost.js";
import petsRouter1 from "./routes/pets.js";
import userOrder from "./routes/userOrder.js";

const app = express();
const port = 8080;
import cors from "cors";
import adoption from "./routes/adoption.js";
import hospitalBook from "./routes/hospitalBooking.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", productsRoutes1);
app.use("/api", hospitalRoutes1);
app.use("/api", postRouter1);
app.use("/api", userOrder);
app.use("/api", petsRouter1);
app.use("/api", adoption);
app.use("/api", hospitalBook);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

export { port };
