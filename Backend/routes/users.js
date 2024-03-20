import express from "express";
import db from "../connect.js";

const router = express.Router();

router.get("/all", (req, res) => {
  let q = "SELECT * FROM user_table";
  db.query(q, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

export default router;
