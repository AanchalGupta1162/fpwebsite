import React from 'react'
import TextExample from '../components/FeedbackCard';
import ColorSchemesExample from '../components/Navbar';
import './FeedbackCard.css'
function Feedback(){
  return (
    <div>
        <ColorSchemesExample/>
        <div className='card-container'>
            <TextExample/>
            <TextExample/>
            <TextExample/>
            <TextExample/>
            <TextExample/>
        </div>
    </div>
  )
}

export default Feedback;