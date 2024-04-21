import express from "express";
import db from "../connect.js";

const hospitalBook = express.Router();

//get user based orders
hospitalBook.get("/hospitalBooking/:id", (req, res) => {
  let id = req.params.id;
  let q = "select * from hospitalBook_table where adoption_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalBook.post("/hospitalBooking", (req, res) => {
  let q = "insert into hospitalBook_table (`booker_id`, `h_id`) values (?)";
  const values = [req.body.booker_id, req.body.h_id];
  db.query(q, [values], (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalBook.delete("/hospitalBooking/:id", (req, res) => {
  let id = req.params.id;
  let q = "delete from hospitalBook_table where h_id = (?)";
  db.query(q, id, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

hospitalBook.get("/hospitalBookingInnerJoin", (req, res) => {
  const q =
    "select * from hospitalBook_table inner join user_table on hospitalBook_table.booker_id = user_table.user_id INNER JOIN hospitalTable ON hospitalBook_table.h_id = hospitalTable.h_id;";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
hospitalBook.get("/hospitalBookingInnerJoin/:id", (req, res) => {
  let id = req.params.id;
  const q =
    "select * from hospitalBook_table inner join user_table on hospitalBook_table.booker_id = user_table.user_id INNER JOIN hospitalTable ON hospitalBook_table.h_id = hospitalTable.h_id where user_table.user_id=(?);";
  db.query(q, id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default hospitalBook;
