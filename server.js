require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
const userRoute = require("./route/userRoute");
const roleRoute = require("./route/roleRoute");
const postRoute = require("./route/postRoute");

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = process.env.BASE_URL;

app.use(`${BASE_URL}/users`, userRoute);
app.use(`${BASE_URL}/roles`, roleRoute);
app.use(`${BASE_URL}/posts`, postRoute);

const init = async () => {
  await dbConnect();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
