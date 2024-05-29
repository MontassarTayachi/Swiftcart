import { Zoom } from '@mui/material';
import { useMap } from 'react-leaflet';
 
function GoTo({ position }) {
  const map = useMap();
  map.setView(position,20);

 
  return null;

}

export default GoTo;
