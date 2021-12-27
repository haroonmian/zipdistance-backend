const express = require("express");
const cors = require("cors");
const zipcodesRoute = require("./routes/zipscodes");
const bodyparser = require("body-parser");

const app = express();

app.use("*", cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/zipcodes", zipcodesRoute);

const PORT = 4000;

app.listen(PORT, () => console.log("running on port: ", PORT));