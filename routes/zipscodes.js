const exporess = require("express");
const zipcodes = require("../controllers/zipscodes");

const router = exporess.Router();

router.post("/measuredistance", zipcodes.measureDistance);

router.get("/search/:zipcode", zipcodes.search);

module.exports = router;
