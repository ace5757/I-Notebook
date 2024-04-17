import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [credential, setCredential] = useState({name:'', email: '', password:'', cpassword:''})
    let navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:3003/v1/auth/createUser', {
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            
            //save token
            localStorage.setItem('token', json.authtoken)
            props.showAlert("created a user succesfully", "success")
            
            //redirect
            navigate("/")
            //console.log("redirect")
        }
        else{
            props.showAlert("Choose a diff email", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h2>Sign-in to access to i-notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>

                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} required/>

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>

                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} required/>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>

                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>

                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="col-sm-2 col-form-label">Confirm Password</label>

                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>

                </div>

                <button type="submit" className="btn btn-primary" >Sign in</button>
            </form>
        </div>
    )
}

export default Signup
