import { IoIosClose } from "react-icons/io"; 
import { Backdrop, Rating } from '@mui/material'
import { Rate } from 'antd'
import React, { useState } from 'react'
import './Review.css'
import { API_BASE_URL } from "../../../config";

function Review({setOpen,product_id}) {
    const[rate, setRate] = useState(0)
    const[review, setReview] = useState('')
    const[errorReview, setErrorReview] = useState(false)
    const [errorRate, setErrorRate] = useState(false)
    const [error,setError] = useState('')
    const handleChange = (e) => {
        setReview(e.target.value)
    }
    const Validate = () => {
       let  isValid=true
        if(rate==0){
            setErrorRate(true)
            isValid=false
        }
        else setErrorRate(false)
        if(review.length<30){
            setErrorReview(true)
            isValid=false
        }
        else setErrorReview(false)
        return isValid
    }

    const handleSubmit = async () => {
        if(!Validate()){
            return;
        }
        try {
            const respanse = await fetch(API_BASE_URL+'/reviews',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    rating:  rate,
                    comment: review,
                    product_id
                })
            })
            const data = await respanse.json()
            console.log(data)
            if(data.success){
                setOpen(false)
            }
            else{
                throw new Error(data.message)
             
            }
        } catch (error) {
            setError('An error occured, please try again')
            
        }
       
    }
  return (
   <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }} >
        <div className='review9888899889899889'>
         <div className='close'><button onClick={()=>setOpen(false)}><IoIosClose /></button>  </div>   
        <h1>Product Evaluation</h1>
        <p>Leave feedback about this order</p>
        <div className='ratingEtoiles'>
            <h3>Rate the product</h3>
            <Rate className='rating'  value={rate}onChange={setRate}/>
            <p style={{color: 'red', display: errorRate?'block':'none'}}>Please rate the product</p>
        </div>
        
        <textarea placeholder='Write your review here...' rows={3}  minLength={200}
        value={review}
        onChange={handleChange}
        style={{borderColor: errorReview?'red':'#ccc'}}
        ></textarea>
        <p style={{color: 'red', display: errorReview?'block':'none'}}>Review must be at least 30 characters</p>
        {error&&<p style={{color: 'red'}}>{error}</p>}
        <button onClick={handleSubmit}>Submit</button>
    </div>
    </Backdrop>

  )
}

export default Review