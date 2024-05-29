import { Outlet, useLocation ,useParams} from 'react-router-dom';
import React, { useState, useEffect} from "react";
import './Style/Dashboard.css';
import Navbar from './Navbar';
import Sidbar from './Sidbar';
import Backdrop from '@mui/material/Backdrop';

function Dashboard() {
    let { id } = useParams();
    const [toggle, setToggle] = useState(false);

    const toggleValue = () => {
        setToggle(prevToggle => !prevToggle);
    };
    return (
       
           <>
           <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={toggle}>
           <Sidbar setToggle={toggleValue} />
           </Backdrop>
            <div className={`HomeAdmin_Dashborad`}>
                <div className="navbar">
                    <Navbar setToggle={toggleValue} />
                </div>
                <div className={`sidbar `}>
                    <Sidbar setToggle={toggleValue} />
                </div>
                <div className="abody">
                    <Outlet />
                </div>
            </div></>
      
    );
}

export default Dashboard;
