const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
  note: {
    type: String,
  },
  is_pinned: {
    type: Number,
    default: 0,
  },
  is_archived: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
  },
  created_at: {
    type: Date,
    default:Date.now
  },
  updated_at: {
    type: Date,
    default : Date.now
  },
});

noteSchema.pre("update", function (next) {
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

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
