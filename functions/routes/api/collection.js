const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// @route GET /api/redirect/test
// @desc Test API and point
// @access Public
router.get("/test", (req, res) => res.json({ msg: "API is working" }));

// Routes
router.get("/", (req, res) => {
  URL.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", daerrorta);
    });
});

module.exports = router;
