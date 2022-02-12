
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  
    const notes = [
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
        }
      ]
    return(
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
