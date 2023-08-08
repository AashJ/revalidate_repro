import sqlite3 from "sqlite3"

export const db = new sqlite3.Database('./repro.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the repro database.');
});
