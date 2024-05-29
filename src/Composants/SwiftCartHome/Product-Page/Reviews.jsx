import { Avatar, Rate } from 'antd'
import React, { useEffect } from 'react'
import './Reviews.css'
import { API_BASE_URL } from '../../../config';
function Reviews({review,helpful}) {
    const isoDate = review?.created_at;
    const[isInMyHelpful,setIsInMyHelpful]=React.useState(false)
 useEffect(() => {
        if(helpful){
           helpful.map((help)=>{
                if(help.review_id===review.id){
                     setIsInMyHelpful(true)
                }
              })
        }
    }, [helpful])
const date = new Date(isoDate);

const Helpfull=async ()=>{
    if(isInMyHelpful){
       try {
        const response = await fetch(`${API_BASE_URL}/helpfuls?review_id=${review.id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
           
        }
    )
            const data = await response.json()
            if(data.success){
                setIsInMyHelpful(false)
            }
       } catch (error) {
        
       }
    }else{
        const response = await fetch(`${API_BASE_URL}/helpfuls?review_id=${review.id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
            ,body:JSON.stringify({review_id:review.id})
        }
    )
        const data = await response.json()
        console.log(data)
        if(data.success){
            setIsInMyHelpful(true)
        }
    }
}
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janvier est 0
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
  return (
    <div className='userReviews'>
        <div className='user'>
            <div className='userName'>
            <Avatar className='image' size={40} src={review?.user?.image}/>
            <h1>{review?.user?.first_name}</h1>
            </div>
            <div className='date'>
                {formattedDate}
            </div>
          
        </div>
        <div className='Review'>
            <Rate className='rating' value={review?.rating} defaultValue={3.5} allowHalf={false} disabled></Rate>
            <p>{review?.comment}</p>
        </div>
       {review?.helpful_votes>0 &&<div className='numbre_helpful'>{review?.helpful_votes} people found this helpful</div>}
        <div className='button'> 
        {!isInMyHelpful?<button onClick={Helpfull} className='helpful'>Helpful</button>:
        <button className='helpful' style={{backgroundColor:'green',color:'white'}} onClick={Helpfull} >Helpful</button>}
        
        </div>
        
    </div> 
  )
}

export default Reviews