import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "petShop",
  database: "petShop",
});

// const db = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "kimbay",
//   database: "petShop",
// });

export default db;
