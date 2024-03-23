import express from "express";
import db from "../connect.js";

const postRouter = express.Router();

postRouter.get("/posts", (req, res) => {
  const q = "select * from post_table";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

postRouter.get("/singlePost/:id", (req, res) => {
  let id = req.params.id;
  const q = "select * from post_table where post_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

postRouter.post("/posts", (req, res) => {
  const q = "insert into post_table (`img_url`,`content`) values (?)";
  const values = [req.body.img_url, req.body.content];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

export default postRouter;
