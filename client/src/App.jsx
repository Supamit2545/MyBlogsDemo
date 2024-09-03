import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Blogs from './Pages/Blogs'
import Contact from './Pages/Contact'
import Catoon from './Pages/Catoon';
import Login from './Pages/Auth/Login';

function App() {
  return (
    <main>
      <div className='Navbar'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Blogs' element={<Blogs />} />
        <Route path='/Catoon' element={<Catoon />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </main>
  )
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

