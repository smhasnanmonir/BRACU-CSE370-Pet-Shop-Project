import express from "express";
import db from "../connect.js";

const userRouter = express.Router();

// Get all users data from database
userRouter.get("/users", (req, res) => {
  let q = "SELECT * FROM user_table";
  db.query(q, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

// Get single user data from database from id
userRouter.get("/singleUser/:id", (req, res) => {
  let id = req.params.id;
  let q = "SELECT * FROM user_table WHERE user_id = ?";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

// Get single user data from database from email
userRouter.get("/singleUserFromEmail/:email", (req, res) => {
  let email = req.params.email;
  let q = "SELECT * FROM user_table WHERE email = ?";
  db.query(q, email, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

// insert a new user into the database
userRouter.post("/users", (req, res) => {
  let q =
    "insert into user_table (`username`, `email`, `password`, `name` ,`phone`) values (?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.phone,
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

//to update a existing user
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
