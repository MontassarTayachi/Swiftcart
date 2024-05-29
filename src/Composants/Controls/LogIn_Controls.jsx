import { AiOutlineAppstoreAdd } from "react-icons/ai"; 
import { GoPin } from "react-icons/go"; 
import { BsClockHistory } from "react-icons/bs"; 
import { AiOutlineAppstore } from "react-icons/ai"; 
import { MdFavorite } from "react-icons/md"; 
import { CgClose } from "react-icons/cg"; 
import React from 'react'
import './LogIn_Controls.css'
function LogIn_Controls({show, setShow}) {
  return (
    <div style={ {display: !show? 'none':'flex'}} className="LogIn_Controls895987">
      <div className="panel"> 
      <div className="Header">
        <h1>
          Log in
        </h1>
        <button onClick={
          ()=>setShow(false)
        }><CgClose /></button>
      </div>
        <div className="body">
          <h1>Log in to take advantage of Swiftcart features</h1>
          <div className="item">
              <MdFavorite className="icon" />
              <h4>Select your favorite products</h4>
          </div>
          <div className="item">
              <AiOutlineAppstore className="icon"  />
              <h4>Save your favorite stores</h4>
          </div>
          <div className="item">
              <BsClockHistory className="icon"  />
              <h4>Get the best deals</h4>
          </div> 
          <div className="item"> 
              <GoPin className="icon" />
              <h4>Give your opinion on all products</h4>
          </div>
          <div className="item">
              <AiOutlineAppstoreAdd className="icon" />
              <h4>create your store</h4>
          </div>
        </div>
        <div className="footer">
        <h4>Don't have an account yet? <span onClick={()=>window.location.href='/Swiftcart/SignUp'}>Sign up</span></h4>
          <button onClick={()=>window.location.href='/Swiftcart/Login'}>Log in</button>
        
          </div>
      </div>
    </div>
  )
}

export default LogIn_Controls