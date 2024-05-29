import React from 'react'
import { Link } from 'react-router-dom'
import './CardGroup.css'

function CardGroup({cardTitel,List}) {
  return (
    <div
    className='CardGroup-555'>
        <h1>{cardTitel}</h1>
        <div className='CardGroup-555-1'>
            <div onClick={List[0]?.onClik}
            className='CardGroup-555-1-1'
            >
                <img src={List[0]?.photo} alt="Card 1" />
                <h5>{List[0]?.titre}</h5>
            </div>
            <div onClick={List[1]?.onClik} className='CardGroup-555-1-1'>
                <img src={List[1]?.photo} alt="Card 1" />
                <h5>{List[1].titre}</h5>
            </div>
            <div onClick={List[2]?.onClik} className='CardGroup-555-1-1'>
                <img src={List[2]?.photo}
                alt="Card 1" />
                <h5>{List[2].titre}</h5>
            </div>
            <div onClick={List[3]?.onClik} className='CardGroup-555-1-1'>
                <img src={List[3]?.photo} alt="Card 1" />
                <h5>{List[3]?.titre}</h5>
            </div>
        </div>
      <div className='tdgygdegdeyyegyd'>  <Link  to="/product">See more</Link></div>
    </div>
  )
}

export default CardGroup