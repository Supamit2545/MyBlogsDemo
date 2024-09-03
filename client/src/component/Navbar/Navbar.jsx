import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const [Login , setLogin] = useState(false)
    const [active , setActive] = useState(1)
    const [user , setUser] = useState("")

    const ActiveTab = (index) =>{
        setActive(index)
        localStorage.setItem("activetab" , index)
    }

    function initializeTab() {
        const saveTab = localStorage.getItem('activetab');
        const activeindex = saveTab ? parseInt(saveTab, 10) : 0;
    
        setActive(activeindex);
    }
    
    useEffect(()=>{
        initializeTab()
        try {
            const response = axios.get(`http://localhost:3001/GetUser`, {
                withCredentials: true
            }).then((res) => {
                setUser(res.data.users)
                setLogin(true)
            })
        } catch (error) {
            console.error("Not Logged");
            setLogin(false)
        }
    },[])    

  return (
    <nav className='navbar'>
        <div className='nav-header'>
            <div className=' relative'>
                <div className='nav-text-head'>SideNav</div>
            </div>
            <ul className="nav-ul">
                <Link to={'/'}><button id='tabs' className={`nav-li ${active === 1 ? "active":""}`} onClick={(e)=>{ActiveTab(1)}}>Home</button></Link>
                <Link to={'/Blogs'}><button id='tabs' className={`nav-li ${active === 2 ? "active":""}`} onClick={(e)=>{ActiveTab(2)}}>Blogs</button></Link>
                <Link to={'/Catoon'}><button id='tabs' className={`nav-li ${active === 3 ? "active":""}`} onClick={(e)=>{ActiveTab(3)}}>Catoon</button></Link>
                <Link to={'/Contact'}><button id='tabs' className={`nav-li ${active === 4 ? "active":""}`} onClick={(e)=>{ActiveTab(4)}}>Contact</button></Link>
            </ul>
        </div>
        <div className='nav-footer'>
            {Login ?(
                <div className='space-y-5'>
                    <div>
                        <p className='text-2xl text-white font-bold'>Login : <span className='text-green-500'>{user}</span></p>
                    </div>
                    <div className=''>
                        <button className='border-2 bg-red-500 rounded-3xl px-10 py-1 mb-10 font-bold hover:bg-red-700'>Logout</button>
                    </div>
                </div>
            ):(
                <div>
                    <Link to={'/Login'}><button className='mb-5 text-xl text-white font-mono border-2 border-red-400 bg-red-500 rounded-3xl px-20 py-1 font-bold hover:bg-red-700' onClick={(e)=>{ActiveTab(5)}}>Login</button></Link>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar