import React from 'react'
import ColorSchemesExample from '../components/Navbar'
import './BusRoutes.css'
import BasicExample from '../components/Card'
function BusRoutes() {
  return (
    <div>
        <div><ColorSchemesExample/></div>
        <br/>
      <div className='card-container'>
      <BasicExample/>
      <BasicExample/>
      <BasicExample/>
      <BasicExample/>
      </div>  
      

    </div>
  )
}

export default BusRoutes;