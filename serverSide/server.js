const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith("audio/")
      ? "uploads/audio"
      : "uploads/images";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
const PORT = 3000;
const JWT_SECRET = "supersecretkey";

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Register new user
app.post("/api/register", upload.single("profile"), (req, res) => {
  const { name, email, password, role } = req.body;
  const profileImagePath = req.file?.filename || "defaultProfile";
  const hashedPassword = bcrypt.hashSync(password, 8);

  const stmt = db.prepare(
    "INSERT INTO users (name, email, password, role, profile_image) VALUES (?, ?, ?, ?, ?)"
  );

  stmt.run(name, email, hashedPassword, role, profileImagePath, function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "User already exists" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }

    const userId = this.lastID;
    const token = jwt.sign({ id: userId, role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      accessToken: token,
      user: { id: userId, email, role, profile: profileImagePath },
    });
  });
});

// Login existing user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // Don't expose if user exists
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/api/artist-events/:id", (req, res) => {
  const artistId = req.params.id;

  db.all(
    "SELECT * FROM events WHERE artistId = ? AND isApproved = 1",
    [artistId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching events" });
      }
      res.json({ events: rows });
    }
  );
});
app.post(
  "/api/add-songs",
  upload.fields([
    { name: "coverArt", maxCount: 1 },
    { name: "audioPath", maxCount: 1 },
  ]),
  (req, res) => {
    const { title, genre, artistId } = req.body;
    const coverArt =
      req.files["coverArt"]?.[0]?.filename || "assets/images/1.jpg";
    const audioPath = req.files["audioPath"]?.[0]?.filename || "";

    db.run(
      `
    INSERT INTO songs (title, genre, coverArt, audioPath, artistId)
    VALUES (?, ?, ?, ?, ?)`,
      [title, genre, coverArt, audioPath, artistId],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Error adding song" });
        }
        res.status(200).json({ message: "Song uploaded" });
      }
    );
  }
);

//get all songs
app.get("/api/all-songs", (req, res) => {
  db.all(
    "SELECT songs.*, users.name AS artistName FROM songs JOIN users ON songs.artistId = users.id ",
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error fetching songs" });
      res.json(rows);
    }
  );
});
app.get("/api/all-artists", (req, res) => {
  db.all("SELECT  * FROM users WHERE role LIKE 'Artist'   ", (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching songs" });
    res.json(rows);
  });
});

//approved songs for the user
app.get("/api/approved-songs", (req, res) => {
  db.all(
    "SELECT songs.*, users.name AS artistName FROM songs JOIN users ON songs.artistId = users.id  WHERE isApproved = 1;",
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error fetching songs" });
      res.json(rows);
    }
  );
});

//admin sng approval route
app.get("/api/unapproved-songs", (req, res) => {
  db.all(
    "SELECT songs.*, users.email AS artistEmail FROM songs JOIN users ON songs.artistId = users.id WHERE songs.isApproved = 0;",
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error fetching songs" });
      res.json(rows);
    }
  );
});

app.post("/api/approve-song/:id", (req, res) => {
  const id = req.params.id;

  const query = `UPDATE songs SET isApproved = 1 WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error approving song", error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json({ message: "Song approved successfully", songId: id });
  });
});

app.post("/api/approve-event/:id", (req, res) => {
  const id = req.params.id;

  const query = `UPDATE events SET isApproved = 1 WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error approving events", error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event  approved successfully", songId: id });
  });
});

//for the each artist songs
app.get("/api/artist-songs/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT songs.*, users.name AS artistName FROM songs JOIN users ON songs.artistId = users.id  WHERE artistId= ? `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching songs", error: err.message });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No songs found for this artist" });
    }

    res.json({ songs: rows });
  });
});
//each artists
app.get("/api/artist/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM users  WHERE  role='Artist' AND id= ? `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching songs", error: err.message });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No songs found for this artist" });
    }

    res.json({ artist: rows });
  });
});

//Events of each artist
app.get("/api/artist/event/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM events WHERE isApproved=1 AND artistId = ?`;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching Events of artist",
        error: err.message,
      });
    }

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this artist" });
    }

    res.json({ events: rows });
  });
});

app.post("/api/add-events", (req, res) => {
  const { artistId, title, date, time, location } = req.body;

  db.run(
    `
    INSERT INTO events (title, date, time, location, artistId)
    VALUES (?, ?, ?, ?, ?)`,
    [title, date, time, location, artistId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Error adding Event" });
      }
      res.status(200).json({ message: "Event Added" });
    }
  );
});

app.post("/api/book-event", (req, res) => {
  const { userId, eventId } = req.body;

  const query = `INSERT INTO bookings (userId, eventId) VALUES (?, ?)`;

  db.run(query, [userId, eventId], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Booking failed", error: err.message });
    }

    res.json({ message: "Event booked successfully", bookingId: this.lastID });
  });
});

// Admin to Approve Event
app.get("/api/unapproved-events", (req, res) => {
  db.all(
    "SELECT events.*, users.email AS artistEmail FROM events JOIN users ON events.artistId = users.id WHERE events.isApproved = 0;",
    (err, rows) => {
      if (err)
        return res.status(500).json({ message: "Error fetching Events" });
      res.json(rows);
    }
  );
});
app.get("/api/all-events", (req, res) => {
  db.all("SELECT * From events", (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching Events" });
    res.json(rows);
  });
});

app.get("/api/all-bookings", (req, res) => {
  db.all("SELECT * From bookings", (err, rows) => {
    if (err)
      return res.status(500).json({ message: "Error Fetching Bookings" });
    res.json(rows);
  });
});

app.get("/api/all-user-bookings", (req, res) => {
  db.all(
    "SELECT bookings.*, events.* FROM bookings JOIN events ON bookings.eventId = events.id",
    (err, rows) => {
      if (err)
        return res.status(500).json({ message: "Error Fetching Bookings" });
      res.json(rows);
    }
  );
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
