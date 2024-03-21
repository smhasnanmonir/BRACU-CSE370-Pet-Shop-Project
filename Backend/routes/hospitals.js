import express from "express";
import db from "../connect.js";

const hospitalRouter = express.Router();

hospitalRouter.get("/allHospital", (req, res) => {
  const q = "select * from hospitalTable";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

hospitalRouter.get("/hospitalDetails/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from hospitalTable where h_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalRouter.put("/hospitalUpdate/:id", (req, res) => {
  let id = req.params.id;
  let q =
    "update hospitalTable set hospital_name=?, address=?, city=?, phone_number=? where h_id = (?)";
  let values = [
    req.body.hospital_name,
    req.body.address,
    req.body.city,
    req.body.phone_number,
    id,
  ];
  db.query(q, values, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

export default hospitalRouter;
