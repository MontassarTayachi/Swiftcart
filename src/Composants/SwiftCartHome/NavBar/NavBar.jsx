import { HiOutlineSwitchHorizontal } from "react-icons/hi"; 
import { BiMenu } from "react-icons/bi"; 
import { AiFillHeart } from "react-icons/ai"; 
import { IoMdNotifications } from "react-icons/io"; 
import { FaOpencart } from "react-icons/fa"; 
import React,{useEffect,useState} from 'react';
import swiftcart from '../../../assets/images/swiftcart/swiftcart01.png';
import './Style/Navbar.css';
import SearchBar from './SearchBar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Sidebar from './SidBar/SidBar';
import AccountMenu from './AccountMenu';
import { useUser } from '../../../Context/UserProvider';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { useCart } from "../../../Context/CartProvider";

function useStorageCounts() {
  const [counts, setCounts] = useState({ wishlist: 0, compare: 0, cart: 0 });
  const { cart } = useCart();
  useEffect(() => {
    const updateCounts = () => {
      setCounts({
        wishlist: (JSON.parse(localStorage.getItem('wishlist')) || []).length,
        compare: (JSON.parse(localStorage.getItem('compare')) || []).length,
        cart:cart?.length
      });
    };
    // Listen for custom events to update counts
    window.addEventListener('storageChange', updateCounts);

    // Initial update
    updateCounts();

    return () => {
      window.removeEventListener('storageChange', updateCounts);
    };
  }, [cart]);

  return counts;
}

function NavBar() {
  const { userInfo } = useUser();
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("token")){
      setLogIn(true);
    }
    else{
      setLogIn(false);
    }
 }, []);
  const [open, setopen] = React.useState(true);
  const [openSidbar, setopenSidbar] = React.useState(false);
  const handleWindowResize = () => {
    if (window.innerWidth < 800) {
      setopen(false);
    } else {
      setopen(true);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const { wishlist, compare, cart } = useStorageCounts();
  return (
    <>
    <Backdrop
        onClick={()=>{
        setopenSidbar(false)
        }}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openSidbar}
      >
      <Sidebar onClose={()=>{setopenSidbar(false)}}></Sidebar>
    </Backdrop>
    {open ?
    <>
    <div className='Navbar'>
        <div className='logo'>
          <img src={swiftcart}></img> 
        </div>
        <SearchBar/>   
        <div className="right">
           {!logIn ?  <>
            <Link className='Connexion' to={'/Swiftcart/logIn'}>Connexion</Link>
            <Link className='Commencer' to ={'/Swiftcart/SignUp'}>Commencer</Link>
            </>:
            <div className='cybxzbxzb'>
            <Tooltip placement="bottom"  title="Compare" arrow>  <NavLink  to={'/Swiftcart/Compare'}> <div className='cart' > <Badge badgeContent={compare} color="primary"><HiOutlineSwitchHorizontal /></Badge></div></NavLink></Tooltip>
           <Tooltip placement="bottom"  title="Wishlist" arrow> <NavLink to={'/Swiftcart/wishlist'} className='cart' > <Badge badgeContent={wishlist} color="primary"><AiFillHeart /></Badge></NavLink></Tooltip>
           <Tooltip placement="bottom"  title="Notification" arrow>  <NavLink  to={'/Swiftcart/Cart'}>  <div className='cart'> <Badge badgeContent={0} color="primary"><IoMdNotifications /></Badge></div> </NavLink>  </Tooltip>   
           <Tooltip placement="bottom"  title="Cart" arrow><NavLink  to={'/Swiftcart/Cart'}>   <div className='cart'> <Badge badgeContent={cart} color="primary"><FaOpencart /></Badge></div> </NavLink></Tooltip>
           
              <AccountMenu  userInfo={userInfo}></AccountMenu> 
            </div>}
              
        </div>
    </div>
   
    
    </>:
    <>
   <div className='Navbar2'>
    <div className="top">
        <div className='logo'><img src={swiftcart}></img> </div> 
         <div className='right'>
          {!logIn ?  <>
          <Link className='Connexion' to={'/Swiftcart/logIn'}>Connexion</Link>
          <Link className='Commencer' to ={'/Swiftcart/SignUp'}>Commencer</Link>
          </>:
          <div className="menu">
            <button onClick={()=>{setopenSidbar(true)}}><BiMenu /></button>
          
          </div>
          }
            
      </div>
    </div>
    <SearchBar/>  
</div>


    </>
    }
    </>
  )
}

export default NavBar