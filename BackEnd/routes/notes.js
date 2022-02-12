const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 fetch all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Route 2 add note
router.post("/addnote",fetchuser,
  [
    body("description").isLength({ min: 5 }),
    body("title").isLength({ min: 3 }),
  ],async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //javascript validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);


//Route 3 update note

router.put("/updatenote/:id",fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find that note by id to update
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found.")};

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed.");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
    res.json({note});
});


//Route 4 delete note


router.delete("/deletenote/:id",fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found.")};

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed.");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({success:"Successfully deleted"});
});

module.exports = router;
