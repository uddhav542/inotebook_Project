import React from 'react'
import noteContext from "../context/Notes/NoteContext"
import { useContext } from 'react';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div>

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
