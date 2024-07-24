import { useState } from 'react'
import NoteContext from "./noteContext"

const NoteState = (props) => {
  const host = "https://deploy-i-notebook-backend.vercel.app"
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)

   //getAll note
   const getNotes = async() => {
    //todo API call (get data from backend too)
    const response = await fetch(`${host}/v1/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json) 
  }

  //add note
  const addNote = async(title, description, tag) => {
    //todo API call (add data from backend too)
    const response = await fetch(`${host}/v1/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))         //return a array
    
  }
  //delete note
  const deleteNote = async(id) => {
    //todo API call (delete data from backend too)
    const response = await fetch(`${host}/v1/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
      
    });
    const json = await response.json()

   // console.log("deleting node with id " + id)
    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes)
  }
  //edit note
  const editNote = async(id, title, description, tag) => {
    //todo API call (edit data from backend too)
    const response = await fetch(`${host}/v1/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({id, title, description, tag})
    });
    const json = await response.json()
    
   
    //logic to edit data
    const newNotes = JSON.parse(JSON.stringify(notes))
    // we cant change notes directly so we making a new note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}       {/* allowing all children to use states we created here */}
    </NoteContext.Provider>
  )
}

export default NoteState
