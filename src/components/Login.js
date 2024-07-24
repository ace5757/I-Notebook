import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credential, setCredential] = useState({email: '', password:''})
    
    let navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch('https://deploy-i-notebook-backend.vercel.app/v1/auth/login', {
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({email: credential.email, password: credential.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            
            //save token
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged in succesfully", "success")
            
            //redirect to home page 
            navigate("/")
            //console.log("redirect")
        }
        else{
            props.showAlert("Wrong credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h2>Login to continue to i-notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>

                    <input type="email" className="form-control" value={credential.email} id="email"name='email' onChange={onChange}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>

                    <input type="password" className="form-control" value={credential.password} id="password" name='password' onChange={onChange}/>

                </div>

                <button type="submit" className="btn btn-primary" >Sign in</button>
            </form>
        </div>
    )
}

export default Login
