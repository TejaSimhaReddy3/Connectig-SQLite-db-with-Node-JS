const express = require("express");
const { open } = require("sqlite");
const app = express();
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DBError : ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;
  const bookArray = await db.all(getBooksQuery);
  response.send(bookArray);
});
