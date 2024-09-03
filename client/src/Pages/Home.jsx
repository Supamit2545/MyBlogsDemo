import React from 'react';
import '../Styles/Home.css';
import MyProfile from '../assets/image/myprofile.jpg';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div className='home-container'>
      <div className="home-header">
      </div>
      <div className="home-body">
        <img className='mx-auto mt-20 mb-5 rounded-full' src={MyProfile} alt="" width={500}/>
        <p className='text-4xl text-white text-center font-bold font-mono'>Welcome to MyBlogs Website</p>
        <p className='text-2xl text-red-500 text-center font-bold font-mono'>but this is demo</p>
        <div className='text-4xl text-green-500 text-center font-bold font-mono'>
          <TypeAnimation className=''
            sequence={[
              'Front-End = React.js',
              1500,  
              'Back-End = Node.js',
              1500,
              'Database = Mysql',
              1500,
            ]}
            speed={25}
            repeat={Infinity}
          />
        </div>
        <p className='text-4xl text-pink-500 text-center font-bold font-mono'>Have a nice day people</p>
      </div>
      <div className="home-footer"></div>
    </div>
  )
}

export default Home