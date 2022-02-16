
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
  
    const notesInitial = [
      {
        "_id": "62065e5a6c77e64d3e6c0fcf",
        "user": "62037c7e4c422d0be978a378",
        "title": "Uddhav patil here",
        "description": "Hello daer",
        "tag": "Welcone sir hoy",
        "date": "2022-02-11T13:02:18.930Z",
        "__v": 0
      },
      {
        "_id": "62065e696c77e64d3e6c0fd2",
        "user": "62037c7e4c422d0be978a378",
        "title": "Uddhav patil here and ther",
        "description": "Hello  sa asdaer",
        "tag": "Welcone sir  asd hoy",
        "date": "2022-02-11T13:02:33.091Z",
        "__v": 0
      },
      {
        "_id": "6209d362c937a65c47a5f683",
        "user": "62037c7e4c422d0be978a378",
        "title": "New Note",
        "description": "Chal Bhag Bhosdike",
        "tag": "Nothing",
        "date": "2022-02-14T03:58:26.433Z",
        "__v": 0
      },
      {
        "_id": "62065e696c77e64d3e6c0fd2",
        "user": "62037c7e4c422d0be978a378",
        "title": "Uddhav patil here and ther",
        "description": "Hello  sa asdaer",
        "tag": "Welcone sir  asd hoy",
        "date": "2022-02-11T13:02:33.091Z",
        "__v": 0
      },
      {
        "_id": "6209d362c937a65c47a5f683",
        "user": "62037c7e4c422d0be978a378",
        "title": "New Note",
        "description": "Chal Bhag Bhosdike",
        "tag": "Nothing",
        "date": "2022-02-14T03:58:26.433Z",
        "__v": 0
      },
      {
        "_id": "62065e696c77e64d3e6c0fd2",
        "user": "62037c7e4c422d0be978a378",
        "title": "Uddhav patil here and ther",
        "description": "Hello  sa asdaer",
        "tag": "Welcone sir  asd hoy",
        "date": "2022-02-11T13:02:33.091Z",
        "__v": 0
      },
      {
        "_id": "6209d362c937a65c47a5f683",
        "user": "62037c7e4c422d0be978a378",
        "title": "New Note",
        "description": "Chal Bhag Bhosdike",
        "tag": "Nothing",
        "date": "2022-02-14T03:58:26.433Z",
        "__v": 0
      }
    ]

    const [notes, setNotes] = useState(notesInitial)
    
    const addNote = (title, description, tag)=>{
      console.log("Adding new ");
        const note = {
          "_id": "6209d362c937a65c47a5f683",
          "user": "62037c7e4c422d0be978a378",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-02-14T03:58:26.433Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
    }

    const deleteNote = (id)=>{
      console.log("Deleting note "+id);
      const newNotes = notes.filter((note)=>{return note._id!==id })
      setNotes(newNotes)
    }

    const editNote = ()=>{

    }

    return(
        <NoteContext.Provider value={{notes , addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
