import express from "express";
import db from "../connect.js";

const adoption = express.Router();

//get user based orders
adoption.get("/adoptions/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from adoption_table where adoption_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

adoption.post("/adoptions", (req, res) => {
  let q = "insert into adoption_table (`user_id`, `pet_id`) values (?)";
  const values = [req.body.user_id, req.body.pet_id];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

adoption.delete("/adoptions/:id", (req, res) => {
  let id = req.params.id;
  let q = "delete from adoption_table where adoption_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

adoption.get("/adoptionInnerJoin", (req, res) => {
  const q =
    "select * from adoption_table inner join user_table on adoption_table.user_id = user_table.user_id INNER JOIN pet_table ON adoption_table.pet_id = pet_table.pet_id;";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
adoption.get("/adoptionInnerJoin/:id", (req, res) => {
  let id = req.params.id;
  const q =
    "select * from adoption_table inner join user_table on adoption_table.user_id = user_table.user_id INNER JOIN pet_table ON adoption_table.pet_id = pet_table.pet_id where user_table.user_id=(?);";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default adoption;
