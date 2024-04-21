import express from "express";
import db from "../connect.js";

const userOrder = express.Router();

//get user based orders
userOrder.get("/userOrders/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from order_table where user_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userOrder.post("/userOrders", (req, res) => {
  let q = "insert into order_table (`user_id`, `product_id`) values (?)";
  const values = [req.body.user_id, req.body.product_id];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userOrder.delete("/userOrders/:id", (req, res) => {
  let id = req.params.id;
  let q = "delete from order_table where order_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

userOrder.get("/userOrdersInnerJoin", (req, res) => {
  const q =
    "select * from order_table inner join user_table on order_table.user_id = user_table.user_id INNER JOIN product_table ON order_table.product_id = product_table.p_id;";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
userOrder.get("/userOrdersInnerJoin/:id", (req, res) => {
  let id = req.params.id;
  const q =
    "select * from order_table inner join user_table on order_table.user_id = user_table.user_id INNER JOIN product_table ON order_table.product_id = product_table.p_id where user_table.user_id=(?);";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default userOrder;
