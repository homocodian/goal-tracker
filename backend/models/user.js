const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name field"],
    },
    email: {
      type: String,
      required: [true, "Please add a email field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
