import { BsPersonCircle } from "react-icons/bs"; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import image from '../../../assets/images/profile.png'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Style/Navbar.css';

export default function AccountMenu({userInfo}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/swiftcart/login'); // Navigate to login or home page after logout
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <div className='homeMenu'>
              <h1>{userInfo.first_name || 'UserName'}</h1>
              <img src={userInfo.image  ||image} alt="User profile" />
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: { /* Your PaperProps remain unchanged */ },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
       
        <MenuItem component={Link} to="/Swiftcart/Accounts">
          <ListItemIcon>
            <BsPersonCircle  size={25}/>
          </ListItemIcon>
          Account
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/Swiftcart/MyStores">
          <ListItemIcon>
            <StorefrontOutlinedIcon fontSize="small" />
          </ListItemIcon>
          My stores
        </MenuItem>
        <MenuItem component={Link} to="/Swiftcart/Accounts/orders">
          <ListItemIcon>
            <AddShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>
        <MenuItem component={Link} to="/Swiftcart/Accounts/General">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Disconnect
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
