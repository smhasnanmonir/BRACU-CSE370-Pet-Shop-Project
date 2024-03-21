import express from "express";
import db from "../connect.js";

const userRouter = express.Router();

userRouter.get("/allUser", (req, res) => {
  let q = "SELECT * FROM user_table";
  db.query(q, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userRouter.get("/singleUser/:id", (req, res) => {
  let id = req.params.id;
  let q = "SELECT * FROM user_table WHERE user_id = ?";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userRouter.post("/allUser", (req, res) => {
  let q = "insert into user_table (`username`, `email`, `password`) values (?)";
  const values = [req.body.username, req.body.email, req.body.password];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userRouter.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const q = "update user_table set email = ?, password = ? where user_id = ?";
  const values = [req.body.email, req.body.password, id];
  db.query(q, values, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

export default userRouter;
