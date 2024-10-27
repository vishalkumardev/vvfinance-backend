require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const bodyParser = require("body-parser");
const routes = require("./route");
const upload = require("./utils/UploadImages");
require("./utils/connection");
require("./relation/index");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1", upload, routes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
