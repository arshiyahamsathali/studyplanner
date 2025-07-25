import React from 'react'
import image1 from './images/img1.png'
import image2 from './images/img2.png'
import './Welcome.css'
import { useNavigate } from 'react-router-dom'
const Welcome = () => {
    const navigate = useNavigate()
    function handle(){
        navigate('/register')
    }
  return (
    <div>
      <div className='heading'>
        <img className='img1' src={image1} alt='img1'/>
        <h1>StudyMate</h1>
      </div>
      <div className='part'>
        <p className='text1'><span className='text2'>Welcome to</span><br/><span className='text'>StudyMate</span><br/>your AI-powered study planner that helps you<br/> organize, track, and achieve your academic goals</p>
        <img className='img2' src={image2} alt='img2'/>
      </div>
      <button className='btn1' onClick={handle}>Start</button>
    </div>
  )
}

export default Welcome
