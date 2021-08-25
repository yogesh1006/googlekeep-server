const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  notes: [
    {
      title: String,
      tags: ['personal','work','others'],
      content: String,
    },
  ],
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
