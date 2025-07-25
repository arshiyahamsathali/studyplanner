import React from 'react'
import image1 from './images/img1.png'
import './DashBoard.css'
import { useNavigate } from 'react-router-dom'
const DashBoard = () => {
    const navigate = useNavigate();
    function sub1(){
        navigate('/studyplanner')
    }
    function sub2(){
        navigate('/emotionsupport')
    }
  return (
    <div>
      <div className='heading'>
        <img className='img1' src={image1} alt='img1'/>
        <h1>StudyMate</h1>
      </div>
      <h2 style={{color:'#000'}}>Dashboard</h2>
      <div className='container'>
        <div className='con1'>
            <p>Study Planner</p>
            <button onClick={sub1}>Start</button>
        </div>
        <div className='con2'>
            <p><b>Plan and message<br/>your study time daily to reach<br/> your learning goals</b></p>
        </div>
    </div>
    <br/>
        <div className='container'>
        <div className='cont1'>
            <p><b>Machine that understands <br/>human feelings through<br/> voice or text</b></p>
        </div>
        <div className='cont2'>
            <p>Emotion Detection</p>
            <button onClick={sub2}>Start</button>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
