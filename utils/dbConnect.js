const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "ibirds-myspace",
    });
    console.log(`DB connected!!!`);
  } catch (error) {
    console.log("dbConnect error=====> ", error.message);
  }
};

module.exports = dbConnect;
