import express from "express";
import db from "../connect.js";

const postRouter = express.Router();

//get all post

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

// get single post
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

// post api
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

//delete post

postRouter.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  const q = "delete from post_table where post_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

//inner join

postRouter.get("/innerPost", (req, res) => {
  const q =
    "select * from post_table inner join user_table on post_table.user_id = user_table.user_id";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// single inner join

postRouter.get("/innerPost/:id", (req, res) => {
  let id = req.params.id;
  const q =
    "select * from post_table inner join user_table on post_table.user_id = user_table.user_id where user_table.user_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default postRouter;
