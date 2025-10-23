const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Amplify.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,               
  profile_image TEXT
    )
  `);
  db.run(`CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  genre TEXT,
  coverArt TEXT,
  audioPath TEXT,
  artistId INTEGER,
  isApproved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (artistId) REFERENCES users(id)
);

`);
  db.run(`CREATE TABLE IF NOT EXISTS events(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT,
  time TEXT,
  location TEXT,
  artistId INTEGER,
  isApproved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (artistId) REFERENCES users(id))`);
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    eventId INTEGER NOT NULL,
    bookingDate TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (eventId) REFERENCES events(id)
  )`);
});

module.exports = db;
