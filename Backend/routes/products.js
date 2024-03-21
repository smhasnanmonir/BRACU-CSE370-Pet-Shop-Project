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
