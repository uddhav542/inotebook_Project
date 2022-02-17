import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";


  const notesInitial = [ ];

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzdjN2U0YzQyMmQwYmU5NzhhMzc4In0sImlhdCI6MTY0NDQ3MTE2Nn0.GLXoxunrQFXmr8mk1Rv1IntV1LOfzTk346BVvfZ1qrY",
      },
      
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };




  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzdjN2U0YzQyMmQwYmU5NzhhMzc4In0sImlhdCI6MTY0NDQ3MTE2Nn0.GLXoxunrQFXmr8mk1Rv1IntV1LOfzTk346BVvfZ1qrY",
      },
      body: JSON.stringify({title, description, tag}),
    });

    console.log("Adding new ");
    const note = {
      _id: "6209d362c937a65c47a5f683",
      user: "62037c7e4c422d0be978a378",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-14T03:58:26.433Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzdjN2U0YzQyMmQwYmU5NzhhMzc4In0sImlhdCI6MTY0NDQ3MTE2Nn0.GLXoxunrQFXmr8mk1Rv1IntV1LOfzTk346BVvfZ1qrY",
      },
     
    });
    const json = response.json();

    console.log("Deleting note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzdjN2U0YzQyMmQwYmU5NzhhMzc4In0sImlhdCI6MTY0NDQ3MTE2Nn0.GLXoxunrQFXmr8mk1Rv1IntV1LOfzTk346BVvfZ1qrY",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
