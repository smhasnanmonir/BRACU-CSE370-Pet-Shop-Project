import express from "express";
import userRouter from "./routes/users.js";

const app = express();
const port = 8080;
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { port };
