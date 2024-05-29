import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5'; // Pour un bouton de fermeture, par exemple
import  Image  from '../../../../assets/images/Montassar Tayachi.png';
import './Style/SidBar.css'
const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar">
      <IoClose className="close-btn" onClick={onClose} />
      <Nav defaultActiveKey="/home" className="">
        <div className='tetesidbar'>
			<img className="imageuser" src={Image}></img>
			<h1 className='nameuser'>Montassar Tayachi </h1>
		</div>
        <Link href="/link">Mon Compte</Link>
		<Link to="/MALL-SHOPPING/HomeBoutique">Mes boutiques</Link>
		<Link href="/link">Adhésions et Abonnements</Link>
		<Link href="/link">Orders</Link>
		<Link href="/link">historique des orders</Link>




        {/* Ajoutez d'autres éléments de la barre latérale selon vos besoins */}
      </Nav>
    </div>
  );
};

export default Sidebar;
