import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom'
import { FaFacebook , FaLine , FaGithub } from "react-icons/fa";
import FBProfile from '../assets/image/myprofile.jpg'
import LINE from '../assets/image/QRline.jpg'
import "../Styles/Contact.css"
import { TypeAnimation } from 'react-type-animation';

const Contact = () => {
  useEffect(()=>{
    AOS.init({});
  },[])
  return (
    <div className='Contact-container'>
      <div className='contact-body mt-10'>
        <p className='text-4xl text-center font-bold text-white underline'>My Contacts</p>
        <div className='Contacts'>
          <div id='item1' className='Contacts-cards'data-aos="zoom-in"> 
            <div className='Contacts-card-header'>
              <img className='rounded-2xl' src={FBProfile} alt="" width={300}/>
            </div>
            <div className='Contacts-card-footer'>
            <a href='https://www.facebook.com/profile.php?id=100018763508340'><button><p className='w-40 mx-auto flex gap-5'><FaFacebook className='my-auto text-blue-500'/>Facebook</p>
            <p>Supamit Phappusa</p></button></a>
            </div>
          </div>
          <div id='item2' className='Contacts-cards' data-aos="zoom-in" >
            <div>
              <img className='rounded-2xl' src={LINE} alt="" width={300}/>
            </div>
            <div className='Contacts-card-footer'>
              <div className='flex w-20 mx-auto'><FaLine className='text-green-500 my-auto'/><p>Line</p></div>
              <p>Supamit Ps</p>
            </div>
          </div>
          <div id='item3' className='Contacts-cards' data-aos="zoom-in" >
            <div className='Contacts-card-header'>
              <img className='rounded-2xl' src={FBProfile} alt="" width={300}/>
            </div>
            <div className='Contacts-card-footer'>
            <a href='https://github.com/Supamit2545' ><button><p className='w-40 mx-auto flex gap-5'><FaGithub className='my-auto text-gray-200'/>GitHub</p>
            <p>Supamit2545</p></button></a>
            </div>
          </div>
          <div id='item4' className='Contacts-cards' data-aos="zoom-in" >
            <div className='Contacts-card-header'>
              <img className='rounded-2xl' src={FBProfile} alt="" width={300}/>
            </div>
            <div className='Contacts-card-footer'>
            <a href='https://fastwork.co/user/actkychan'><button className='w-40 mx-auto flex gap-5'>Fastwork</button>
              <p>Supamit</p>
            </a>
            </div>
          </div>
        </div>
        <div className='text-green-500 text-4xl text-center mt-10 font-bold'>
          <TypeAnimation
          sequence={[
            `I'm looking for Front-End , Back-End , Full-Stack WebDev`,
            1800,
            `Thank you for visit this website`,
            2200,
          ]}
          wrapper='span'
          speed={25}
          repeat={Infinity}
          />
        </div>
      </div>
    </div>
  )
}

export default Contact