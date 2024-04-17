import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnotes = (props) => {
  const context = useContext(noteContext)
  const {addNote } = context

  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleClick=(e)=>{
     e.preventDefault()
     addNote(note.title, note.description, note.tag)
     //empty all fields after geting added or updated
     setNote({ id:"", title: "", description: "", tag: "" })
     props.showAlert("Note added succesfully", "success")
  }
  const onChange = (e)=>{
     setNote({...note, [e.target.name]: e.target.value}) //
  }
  return (
    <div className='container my-3'>
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} required/>
          </div>  
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange}/>
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default Addnotes
