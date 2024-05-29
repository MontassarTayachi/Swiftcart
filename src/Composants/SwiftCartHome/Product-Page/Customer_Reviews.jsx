import { Rate } from 'antd'
import React, { useEffect } from 'react'
import './Customer_Reviews.css'
import { LinearProgress } from '@mui/material'
import Reviews from './Reviews'
import { API_BASE_URL } from '../../../config'
function Customer_Reviews({product}) {
    const[reviews,setReviews]=React.useState([])
    const [length, setLength] = React.useState(2)
    const [reviews_count, setReviews_count] = React.useState([]) 
    const [helpful, setHelpful] = React.useState([])
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/reviews/?product_id=${product.id}`)
                const data = await response.json()
                setReviews(data.reviews[0].reviews)
                setReviews_count(data.reviews[0].reviews_count)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchHelpful = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/helpfuls/user`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('token')}`
                        }
                    }
            )
                const data = await response.json()
                setHelpful(data.helpfuls)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchReviews()
        fetchHelpful()
    }, [product])
  return (
    <div id='Customer_Reviews' className='Customer_Reviews'>
        <div className='Customer_Reviews__Title'>Customer Reviews ({reviews.length})</div>
        <div className='Customer_Reviews__Valus'>
            <div className='etoile'>
                <h1>{product?.rating?.toFixed(2)}</h1>
               <Rate className='etoiles'  value={product?.rating} defaultValue={3.5} allowHalf={true} disabled></Rate>
                <h4>Based on {reviews.length} reviews</h4>
            </div>
            <div className='Customer_Reviews__Valus__Bar'>
                <div className='soso'>
                    <h1>5 stars</h1><LinearProgress className='LinearProgress' variant="determinate" color='inherit' value={reviews.length>0 ? reviews_count[5]/reviews.length*100 : 0} /><h1>{reviews.length>0 ? reviews_count[5]:0}</h1>
                </div>
                <div className='soso'>
                    <h1>4 stars</h1><LinearProgress className='LinearProgress' variant="determinate" color='inherit' value={reviews.length>0 ? reviews_count[4]/reviews.length*100 : 0} /><h1>{reviews.length>0 ?reviews_count[4]:0}</h1>
                </div>
                <div className='soso'>
                    <h1>3 stars</h1><LinearProgress className='LinearProgress' variant="determinate" color='inherit' value={reviews.length>0 ? reviews_count[3]/reviews.length*100 :0} /><h1>{reviews.length>0 ? reviews_count[3]:0}</h1>
                </div>
                <div className='soso'>
                    <h1>2 stars</h1><LinearProgress className='LinearProgress' variant="determinate" color='inherit' value={reviews.length>0 ? reviews_count[2]/reviews.length*100 :0} /><h1>{reviews.length>0 ?reviews_count[2]:0}</h1>
                </div>
                <div className='soso'>
                    <h1>1 stars</h1><LinearProgress className='LinearProgress' variant="determinate" color='inherit' value={reviews.length>0 ? reviews_count[1]/reviews.length*100 :0} /><h1>{reviews.length>0?reviews_count[1]:0}</h1>
                </div>
            </div>

        </div>
        <div id='reviews2'></div>
        {
            reviews?.length>0&& reviews.slice(0,length).map((review,index)=><Reviews helpful={helpful} key={index} review={review}/>)
        }
      {reviews?.length>2&&<div style={{display:'flex',alignItems:'center',justifyContent:"center"}}><a style={{color:'black'}} href='#reviews2'><button className='Customer_Reviews__Button' onClick={()=>{
        if(length==reviews.length){
            setLength(2)
        }else{

        setLength(reviews?.length)}} }> {length==reviews.length?'Display less':'See All Reviews'}</button></a></div> } 
    </div>
  )
}

export default Customer_Reviews