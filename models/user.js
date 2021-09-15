var mongoose = require("mongoose");
const { encrypt } = require("../utils/encrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  var userSchema = this;
  userSchema.password = encrypt(userSchema.password);
  userSchema.created_at = userSchema.updated_at = Date.now;
  next();
});

userSchema.pre("update", function (next) {
  this.update(
    {},
    {
      $set: {
        updated_at: Date.now,
      },
    }
  );
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
