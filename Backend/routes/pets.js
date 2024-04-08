import express from "express";
import db from "../connect.js";

const petsRouter = express.Router();

// Get all users data from database
petsRouter.get("/pets", (req, res) => {
  let q = "SELECT * FROM pet_table";
  db.query(q, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

petsRouter.get("/singlePet/:id", (req, res) => {
  let id = req.params.id;
  let q = "SELECT * FROM pet_table WHERE user_id = ?";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

petsRouter.post("/pets", (req, res) => {
  let q =
    "insert into pet_table (`name`,`img`, `description`, `previous_vet`, `isAdopted`) values (?)";
  const values = [
    req.body.name,
    req.body.img,
    req.body.description,
    req.body.previous_vet,
    req.body.isAdopted,
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

export default petsRouter;
