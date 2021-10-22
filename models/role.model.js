const mongoose = require("mongoose");

const Role = mongoose.model("role",
  {
    name: String
  }
);

module.exports = { Role };