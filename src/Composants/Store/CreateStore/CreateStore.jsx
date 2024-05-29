import React,{useState} from 'react'
import {BorderLinearProgress} from './BorderLinearProgress';
import image from '../../../assets/images/swiftcart/swiftcart2.png';
import './Style/CreateStore.css'; 
import Stepone from './page1';
import Steptwo from './page2';
import Stepthree from './page3';
import Stepfour from './page4';
import Stepfive from './page5';
function CreateStore() {
    const [LinearValue, setLinearValue] = useState(4);
    const [page1, setpage1] = useState(true);
    const [page2, setpage2] = useState(false);
    const [page3, setpage3] = useState(false);
    const [page4, setpage4] = useState(false);
    const [page5, setpage5] = useState(false);
    const [paymentMethods, setpaymentMethods] = useState({
      delivery: false,
      cash: false,
      bankTransfer: false,
      onlinePayment: false
    }) ;
    const [Storename, setStorename] = useState('');
    const [Storecategory, setStorecategory] = useState(null);
    const [businesneeds, setBusinesneeds] = useState('');
    const openPage1=()=>{
      setpage1(true);
      setLinearValue(4);
      setpage2(false);
      setpage3(false);
      setpage4(false);
      setpage5(false);
    }
    const openPage2=()=>{
      setLinearValue(25);
      setpage1(false);
      setpage2(true);
      setpage3(false);
      setpage4(false);
      setpage5(false);
    }
    const openPage3=()=>{
      setpage1(false);
      setLinearValue(50);
      setpage2(false);
      setpage3(true);
      setpage4(false);
      setpage5(false);
    }
    const openPage4=()=>{
      setpage1(false);
      setLinearValue(75);
      setpage2(false);
      setpage3(false);
      setpage4(true);
      setpage5(false);
    }
    const openPage5=()=>{ 
      setpage1(false);
      setLinearValue(99);
      setpage2(false);
      setpage3(false);
      setpage4(false);
      setpage5(true);
    }
  return (
    <div className='CreateStore'>
        <div className='card'>
            <div className='header'>
             <img className='swiftcad' src={image} style={{width:'9rem' ,marginBottom:'1rem'}}></img> 
            <BorderLinearProgress variant="determinate" value={LinearValue} />
         
            </div>
            <div className='main'>
              {page1 && <Stepone openPage2={openPage2} businesneed={businesneeds}function1={setBusinesneeds} ></Stepone>}
              {page2 && <Steptwo openPage1={openPage1} Storename={Storename}function1={setStorename} openPage3={openPage3}></Steptwo>}
              {page3 && <Stepthree openPage2={openPage2} Storecategory={Storecategory}  function1={setStorecategory} openPage4={openPage4}></Stepthree>}
              {page4 && <Stepfour openPage5={openPage5} openPage3={openPage3} paymentMethods={paymentMethods} function1={setpaymentMethods}></Stepfour>}
              {page5 && <Stepfive openPage4={openPage4} businesneeds={businesneeds} paymentMethod={paymentMethods}  Storename={Storename} Storecategory={Storecategory}   ></Stepfive>}
           
            </div>
        </div>
    </div>
  )
}

export default CreateStore