const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    imageUrl: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
