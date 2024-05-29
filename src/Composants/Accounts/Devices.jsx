import { BiMobileAlt } from "react-icons/bi"; 
import { BiLaptop } from "react-icons/bi"; 
import React from 'react'
import Chip from '@mui/material/Chip';
import'./Style/Devices.css'

function Devices({device}) {
    const [Devices] = React.useState(device.device);
    const date = new Date(device.created_at);

// Affichage sous forme "jour/mois/année heures:minutes:secondes"
const dateString = date.toLocaleString('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'UTC',
});
  return (
    <div className="Devices44">
       <div style={{width:'100%',display:'flex',justifyContent:'flex-start',flexDirection:'column'}}>
       <div  className="Details">
       <h1 className="Laptop"> {Devices!=="Desktop"? <BiMobileAlt size={30} /> :<BiLaptop size={30}/>}
          {device.browser} on {device.platform}</h1>
         <Chip label="This device" color="success" />
        </div>
        <div className="Details2" >
            <h1>{dateString}</h1>
        </div>

       </div>


        <div className="LogOut">
            <button >LogOut</button>
        </div>
    </div>
  )
}

export default Devices