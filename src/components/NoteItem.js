import React from 'react'


const NoteItem = (props) => {
   const {note} = props;
  return (
    <div className="col-md-4">
      
     
      <div class="card my-3">
       
        <div class="card-body align-items-center">
           <div className="d-flex">
           <h5 class="card-title">{note.title}</h5>
            <i class="fa-solid fa-trash-can mx-2"></i>
            <i class="fa-solid fa-pen-to-square mx-2"></i>
            </div> 
            <p class="card-text"> {note.description}</p>
            
        </div></div>
    </div>
  )
}

export default NoteItem
