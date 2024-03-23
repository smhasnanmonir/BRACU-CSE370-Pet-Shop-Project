import express from "express";
import db from "../connect.js";

const productsRouter = express.Router();

//Get data of all hospitals from database
productsRouter.get("/allProducts", (req, res) => {
  const q = "select * from product_table";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default productsRouter;

//get single product data

productsRouter.get("/singleProduct/:id", (req, res) => {
  let id = req.params.id;
  const q = "select * from product_table where p_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

productsRouter.post("/allProducts", (req, res) => {
  let q =
    "insert into product_table (`description`, `price`, `cate`) values (?)";
  const values = [req.body.description, req.body.price, req.body.cate];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

productsRouter.put("/singleProduct/:id", (req, res) => {
  let id = req.params.id;
  let q =
    "update product_table set description =?, price =?, cate =? where p_id = (?)";
  let values = [req.body.description, req.body.price, req.body.cate, id];
  db.query(q, values, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
