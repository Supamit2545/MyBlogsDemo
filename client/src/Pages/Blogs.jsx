import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { AiFillLike , AiFillDislike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../Styles/Blogs.css'

const Blogs = () => {
    const [Blogs , setBlogs] = useState([])
    const newData = Blogs.sort((a, b) => b.view - a.view)
    const top10 = newData.slice(0, 10);
    const [top10data , setTop10] = useState(top10)
    const [Newpost , setNewpost] = useState(false)
    const [file, setFile] = useState();
    const [user , setUser] = useState('')
    const [contents , setContent] = useState('')
    const [Logedin , setLogin] = useState(false)
    const togglelike = (id) =>{
        Blogs[index.like] + 1
    }
    const ModalNewpost = () =>{
        setNewpost(!Newpost)
        setFile(null)
    }
    function handleFile(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    const newpost = async () =>{
        axios.post('http://localhost:3001/newpost',{
            User : user,
            contents : contents,
            likes : 0,
            dislikes: 0,
        })
        window.location.reload()
    }
    useEffect(()=>{
        axios.get('http://localhost:3001/getpost')
        .then((res)=>{setBlogs(res.data)})
        .catch((err)=>{console.log(err)})
    },[])
    console.log(Blogs)
    useEffect(()=>{
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
    <div className='blog-container'>
        <div className="blog-header">
        </div>
        <div className="blog-body">
            <div className='text-white font-bold'>
                <h1 className='text-4xl font-mono underline text-center mt-20'>Trading Topic Blogs</h1>
                <div className=''>
                    {top10.length > 0 ?(
                        <div className='TBlogs-body'>
                            {top10data.map((val,index)=>(
                                <Link to={`/Blogs/id${val.id}`}>
                                    <button key={index} className='TBlogs-content'>
                                        <div className='flex gap-2'>
                                            <div>#:{index+1}</div>
                                            <div className=''>Topic : <span className=''>{val.topic}</span></div>
                                        </div>
                                        <div className='text-white'>Host Topic : <span className='text-green-500'>{val.name}</span></div>
                                        <div className=''>Views : {val.view}</div>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    ):(
                        <div><p className='text-5xl text-red-500'>Empty</p></div>
                    )}
                    
                </div>
                <div className="blog-new-post flex justify-end">
                    <button className='new-post bg-green-500 rounded-xl font-mono font-bold' onClick={ModalNewpost}>New Post</button>
                </div>
                <div className='Recent-Blogs'>
                    <p className='my-10 ml-36 text-3xl underline font-mono'>Recent Blogs</p>
                    <div className='Recent-Blogs-body'>
                        <div className="Recent-Blogs-content">
                            {Blogs.length < 1 ?(
                                <div><p className='text-5xl text-red-500 underline'>Empty</p></div>
                            ):(
                                <div>
                                    {Blogs.map((rblogs,index) =>(
                                        <div key={index} className='Recent-Blogs-Blog'>
                                            <p className='rblogs-name'>{rblogs.User}<span>'s Post</span></p>
                                            <div className="rblogs-topic">Topic : {rblogs.contents}</div>
                                            <div className="rblogs-dis overflow-hidden">เนื้อหา : {rblogs.contents}</div>
                                            <div className='flex flex-col gap-5'>
                                                <div className='flex gap-2'>
                                                    <button>Like : {rblogs.likes}</button>
                                                    <button>DisLike : {rblogs.dislikes}</button>
                                                    <p className=''>Comment : 0</p>
                                                </div>
                                                
                                                <div className='flex gap-2 ml-10 mb-2'>
                                                    <button className='text-4xl hover:text-blue-500'><AiFillLike /></button>
                                                    <button className='text-4xl hover:text-red-500'><AiFillDislike /></button>
                                                    <textarea className='rblogs-comment-input' name="" id="" placeholder='Comment Here...'></textarea>
                                                    <button className='text-blue-500 text-4xl my-auto hover:text-blue-700'><FaArrowAltCircleRight /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {Newpost && (
                            <div className='modalOverlay'>
                                <div className='modalContent'>
                                    <button className='modalclosd' onClick={ModalNewpost}>X</button>
                                    {!Logedin ? (
                                        <div className='text-5xl text-center underline space-y-10'>
                                            <p>Please Login First</p>
                                            <p>Thanks!</p>
                                        </div>
                                    ):(
                                        <div>
                                            <div className='InputNewPost'>
                                                <img className='mx-auto rounded-xl mb-5' src={file} width={500}/>
                                                <input className='flex text-center   mx-auto' type="file" name="" id="" onChange={handleFile}/>
                                                <textarea className='newPostText' name="" id="" onChange={(e)=>{setContent(e.target.value)}}></textarea>
                                            </div>
                                            <div className='text-center'>
                                                <button className='border-2 border-black my-5 px-10 py-2 rounded-2xl bg-green-500' onClick={newpost}>Post</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="blog-footer"></div>
    </div>
  )
}

export default Blogs