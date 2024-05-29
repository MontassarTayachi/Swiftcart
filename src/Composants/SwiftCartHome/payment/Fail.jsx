import { CgDanger } from "react-icons/cg"; 
import React from 'react'
import "./Fail.css"
import { Link } from "react-router-dom";
function Fail() {
  return (
    <div className="failedpayment">
      <CgDanger className="icon"/>
      <h1>Payment Failed</h1>
      <Link className="link" to="/Swiftcart">Back to Home</Link>
    </div>
  )
}

export default Fail