const Note = require("../models/note");

module.exports = {
  addNote: async (req, res) => {
    const { title, tags, content } = req.body;
    if (!title || !content) {
      throw { message: "Please add all the fields." };
    }

    const note = new Note({
        title,
        tags,
        content,
        userId:req.user
    })
    console.log(req.user);

    let newNote = await note.save()
     console.log(newNote);

     let notes =await  Note.find().populate('notes')
    res.json({
        status: 'success',
        message:'Note saved successfully.',
        data:notes
    })
  },
};
