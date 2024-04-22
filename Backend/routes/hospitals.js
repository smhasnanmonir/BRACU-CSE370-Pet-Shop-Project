import express from "express";
import db from "../connect.js";

const hospitalRouter = express.Router();

hospitalRouter.get("/vets", (req, res) => {
  const q = "select * from hospitalTable";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

hospitalRouter.get("/vetDetails/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from hospitalTable where h_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalRouter.post("/vets", (req, res) => {
  let q =
    "insert into hospitalTable (`hospital_name`,`address`, `city`, `phone_number`, `img`) values (?)";
  const values = [
    req.body.hospital_name,
    req.body.address,
    req.body.city,
    req.body.phone_number,
    req.body.img,
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalRouter.put("/vetUpdate/:id", (req, res) => {
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
