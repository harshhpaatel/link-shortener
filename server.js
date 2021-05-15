// Require
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Init Express
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Key
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.log(err));

// Routes
const shorten = require("./routes/api/shorten");
app.use("/api/shorten", shorten);

const redirect = require("./routes/api/redirect");
app.use("/api/redirect", redirect);

const collection = require("./routes/api/collection");
app.use("/api/collection", collection);

// Get URL ID and redirect
app.get("/:hash", (req, res) => {
  const id = req.params.hash;
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      doc.clicks++;
      doc.save();
      res.redirect(doc.url);
    } else {
      res.redirect("/");
    }
  });
});

const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

// Path
app.get("/", (req, res) => {
  console.log(URL);
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
