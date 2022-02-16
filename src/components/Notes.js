import React from 'react'
import noteContext from "../context/Notes/NoteContext"
import { useContext } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
  const {notes} = context;
  return (
    <div>
       <AddNote />
      <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note)=>{
            return <NoteItem note={note}/>
          })}
        </div>
    </div>
  )
}

export default Notes
