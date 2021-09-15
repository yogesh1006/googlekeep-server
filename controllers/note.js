const Note = require("../models/note");

module.exports = {
  createNote: async (req, res) => {
    try {
      if (!req.body.title || !req.body.note) {
        throw { message: "Please add all the fields." }
      }
      const { title, note, color, is_archived, is_pinned } = req.body;
      let newNote = new Note({
        user_id: req.user._id,
        title: title,
        note: note,
        color: color,
        is_archived: is_archived,
        is_pinned: is_pinned,
      });
      await newNote.save();
      res.json({ message: "Note is saved." });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },

  getAllNotes: async (req,res) => {
    try {
      const notes = await Note.find({ user_id: req.user._id });
      res.json({ data: notes });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.note_id);
      res.json({ msg: "Deleted a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, note, is_pinned, is_archived, color } = req.body;
      await Note.findOneAndUpdate(
        { _id: req.params.note_id },
        {
          title,
          note,
          is_archived,
          is_pinned,
          color,
        }
      );
      res.json({ msg: "Updated a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
