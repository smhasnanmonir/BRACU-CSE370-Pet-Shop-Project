import express from "express";
import db from "../connect.js";

const productOrder = express.Router();

//get user based orders
productOrder.get("/userOrders/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from order_table where user_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

productOrder.post("/userOrders/:id", (req, res) => {
  let id = req.params.id;
  let q = "insert into order_table (`user_id`, `product_id`) values (?,?)";
  const values = [req.body.user_id, req.body.product_id];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

export default productOrder;
