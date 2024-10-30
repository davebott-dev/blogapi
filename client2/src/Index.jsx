import { useState } from 'react'
import {Link} from 'react-router-dom';
import './App.css'

function Index() {

  return (
    <div className="indexContainer">
      <div>
        <h1>Welcome to Mojos Blog Editor</h1>
        <h2>Only authorized users can write/edit posts about Mojo...</h2>
        <p>Share your best pictures and experiences of mojo with the world!</p>
        <Link to = "home"><button>Enter Editor</button></Link>
      </div>
    </div>
  )
}

export default Index
