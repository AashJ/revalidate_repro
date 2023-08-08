import { db } from "./app/db";

// Create the "records" table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY,
    read BOOLEAN
  )`);

  // Insert 3 records into the "records" table
  db.run(`
  INSERT INTO records (id, read)
VALUES(1, false);
  `)

   db.run(`
  INSERT INTO records (id, read)
VALUES(2, false);
  `)

   db.run(`
  INSERT INTO records (id, read)
VALUES(3, false);
  `)

  

  console.log('Records inserted successfully.');

  // Close the database connection
  db.close();
});