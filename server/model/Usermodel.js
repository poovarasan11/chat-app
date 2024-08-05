const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provied name"],
    },
    email: {
      type: String,
      required: [true, "provied email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provied Password"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
