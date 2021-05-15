const express = require("express");
const router = express.Router();
const shortId = require("shortid");

// Load URL model
const URL = require("../../models/Urls");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// @route GET /api/shorten/test
// @desc Test API and point
// @access Public
router.get("/test", (req, res) => res.json({ msg: "API is working" }));

// @route POST api/shorten
// @desc Post a URL to shorten
// @access Public
router.post("/", (req, res) => {
  //did you get the req?
  console.log(req.body);
  if (req.body.url) {
    urlData = req.body.url;
    customExt = req.body.customext;
  }
  console.log("URL is: ", urlData);
  console.log("custom ext is: ", customExt);

  //Check if the URL already exists
  URL.findOne({ url: urlData }, (err, doc) => {
    console.log(doc);
    if (doc) {
      res.send({
        status: 409,
      });
    } else {
      URL.findOne({ _id: customExt }, (err, doc) => {
        console.log(doc);
        if (doc) {
          res.send({
            status: 400,
          });
        } else {
          console.log("This is a new URL");
          // CREATES UNIQUE ID HERE
          var extension = null;

          if (customExt) {
            extension = customExt;
          } else {
            extension = shortId.generate();
          }

          const webaddress = new URL({
            _id: extension,
            url: urlData,
          });
          webaddress.save((err) => {
            if (err) {
              return console.log(err);
            }
            res.send({
              url: urlData,
              hash: webaddress._id,
              status: 200,
              statusTxt: "OK",
            });
          });
        }
      });
    }
  });
});

module.exports = router;
