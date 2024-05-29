import { AiOutlinePlus } from "react-icons/ai"; 
import { BiChevronRight } from "react-icons/bi"; 
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from "../../../config";
import { Alert, Snackbar } from '@mui/material';
import LogIn_Controls from "../../Controls/LogIn_Controls";
import { useFollowed } from "../../../Context/Followed";
function BoutiqueInfo({store}) {
  const [open, setOpen] = React.useState('');
  const [show, setShow] = React.useState(false)
  const { followed, setFollowed,Refreshes, setRefreshes } = useFollowed();
  const [followed_count, setFollowed_count] = React.useState(0);
  const[isFollowed,setIsFollowed]=React.useState(false)
  useEffect(() => {
    setIsFollowed(followed.some(follow => follow.store_id === store.id));
  }, [store, followed]);
  useEffect(() => {
    const fetchFollowedData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/follows?store_id=${store.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setFollowed_count(data.follows.length);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchFollowedData()
  }, [store]);
  
  const Followed =async ()=>{
    if(localStorage.getItem('token')===null)
    {
      setShow(true)
    }
    else{
      const respance=await fetch(`${API_BASE_URL}/follows`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`${localStorage.getItem('token')}`,
        },
        body:JSON.stringify({
          store_id:store.id,
        })
      })
      const rep=await respance.json();
      if(rep.success){
        setOpen('Followed')
        setRefreshes(prev => prev + 1);
    }else{
      setOpen('Already Followed')
    }
    }
   
  }
  const UnFollowed =async ()=>{
    const respance=await fetch(`${API_BASE_URL}/follows?store_id=${store.id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`${localStorage.getItem('token')}`,
      },
    })
    const rep=await respance.json();
    if(rep.success){
      setOpen('UnFollowed')
      setRefreshes(prev => prev + 1);
  }else{
    setOpen('Already Followed')
  }
  }
  return (
    
  <>
   <LogIn_Controls show={show} setShow={setShow}/>
   <Snackbar
                open={open === 'Followed'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                 {`Followed`} 
                </Alert>
         </Snackbar>
     <Snackbar
                open={open === 'UnFollowed'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                  {`UnFollowed`}
                </Alert>
          </Snackbar>    
    <Snackbar
                open={open === 'Already Followed'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                 {`Already Followed`} 
                </Alert>
         </Snackbar>  
    <div className='BoutiqueInfo984965'>
      <div className="huhzayh">
      <img src={store.profile_image} alt="Banpresto" />
      <div className='mdso'>
        <div className="BoutiqueName"><Link className="h1" to={'/Swiftcart/StorePage/'+store.id}><h1> {store.name} <BiChevronRight className="zzz" /></h1></Link></div>      
      </div>
      </div>
       
        <div className="displayMedia">
         <h3> {(store.rating*100/5).toFixed(2)}% Positive reviews |  {followed_count} Subscribers </h3>
         {
          isFollowed?
          <button className="Followed" onClick={UnFollowed}> Followed</button>
          :
          <button className="Followed" onClick={Followed}><AiOutlinePlus /> Follow</button>
        }
        </div>
    </div></>
  )
}

export default BoutiqueInfo