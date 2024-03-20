import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "petShop",
  database: "petShop",
});

export default db;
