import { useState } from 'react'
import {Link} from 'react-router-dom';
import './App.css'

function Index() {

  return (
    <div className="indexContainer">
      <div>
        <h1>Welcome to Mojos Digital Minimalist Blog!</h1>
        <h2>Please Register to view and comment on Mojos post...</h2>
        <p>Discover the best stories and pictures from the world of Mojo</p>
        <Link to = "posts"><button>Enter Mojos World</button></Link>
      </div>
    </div>
  )
}

export default Index
