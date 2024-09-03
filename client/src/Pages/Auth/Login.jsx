import React, { useEffect, useState } from 'react'
import { IoPeopleCircle } from "react-icons/io5";

import "../../Styles/Login.css"
import axios from 'axios';

const Login = () => {
    const [togglelogin, setToggle] = useState(false)
    const [Users , setUser] = useState([])
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [conpassword , setConPassword] = useState('')
    const [role , setRole] = useState('User')
    const [email , setEmail] = useState('')
    const [Message , setMessage] = useState('')
    
    const switchLogin = () =>{
        setToggle(!togglelogin)
    }
    

    function Register(){
        if(conpassword == password){
            axios.post('http://localhost:3001/Register',{
                username : username,
                email : email,
                password : password,
                role : role,
            }).then((res)=>{
                setUser([
                    ...Users,{
                        username : username,
                        email : email,
                        password : password,
                        role : role,
                    }
                ])
                alert('User Created!')
            }).catch((response)=>{
                setMessage(response.response.data.Message)
            })
        }else{
            setMessage("Password Not Match")
        }
    }
    const Login = async () =>  {
        try{
            axios.defaults.withCredentials = true;
            const response = await axios.post('http://localhost:3001/login',{
                username: username,
                password: password
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log("Login successful!");
                // ทำงานเมื่อ login สำเร็จ
            }
            window.location.href = 'http://localhost:5173';
        }catch(err){
            setMessage(err.response.data.message)
        }
    }

    return (
        <div className='login-container'>
            <div className="login-header">
                {/* <p className='text-center mt-20 text-5xl font-bold font-mono underline'>Login Pages</p> */}
            </div>
            <div className="login-body">
                {!togglelogin ? (
                    <div className='Login-Cards'>
                        <p className='text-center text-4xl font-bold font-mono '>Login Page</p>
                        <p className='login-icon'><IoPeopleCircle className=''/></p>
                        <p className='text-center text-red-500 font-bold text-2xl'>{Message}</p>
                        <form className='login-form'>
                            <p className='login-text'>Username : </p>
                            <input className='login-input' type="text" name="" id="" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                            <p className='login-text'>Password : </p>
                            <input className='login-input' type="password" name="" id="" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                        </form>
                        <div className='flex justify-center gap-10'>
                            <button className='login-btn-submit bg-blue-500 hover:bg-blue-700' onClick={switchLogin}>Go to Register</button>
                            <button className='login-btn-submit hover:bg-green-900' onClick={Login}>Login</button>
                        </div>
                        <div className='flex justify-center'>
                            <button className='font-bold hover:text-red-500'>Forgot Password ?</button>
                        </div>
                    </div>
                ) : (
                    <div className='Login-Cards'>
                        <p className='text-center text-4xl font-bold font-mono '>Register Page</p>
                            <p className='login-icon'><IoPeopleCircle className=''/></p>
                            <p className='text-center text-red-500 font-bold text-2xl'>{Message}</p>
                        <form className='login-form'>
                            <p className='login-text'>Email : </p>
                            <input className='login-input' type="email" name="" id="" placeholder='username' required onChange={(e)=>{setEmail(e.target.value)}}/>
                            <p className='login-text'>Username : </p>
                            <input className='login-input' type="text" name="" id="" placeholder='username' required onChange={(e)=>{setUsername(e.target.value)}}/>
                            <p className='login-text'>Password : </p>
                            <input className='login-input' type="password" name="" id="" placeholder='password' required onChange={(e)=>{setPassword(e.target.value)}}/>
                            <p className='login-text'>Confirm Password : </p>
                            <input className='login-input' type="password" name="" id="" placeholder='password' required onChange={(e)=>{setConPassword(e.target.value)}}/>
                        </form>
                        <div className='mt-24 flex justify-center gap-10'>
                            <button className='login-btn-submit bg-blue-500 hover:bg-blue-700' onClick={switchLogin}>Back to Login</button>
                            <button className='login-btn-submit hover:bg-green-900' onClick={Register}>Sign UP</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="login-footer"></div>
        </div>
    )
}

export default Login