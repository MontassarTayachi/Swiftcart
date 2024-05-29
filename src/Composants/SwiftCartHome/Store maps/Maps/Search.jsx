import  { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

function Search() {
    const map = useMap();
    useEffect(() => {
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
      })
        .on('markgeocode', function(e) {
          
          const bbox = e.geocode.bbox;
  
          L.polygon([
          
          
          ]).addTo(map);
          map.fitBounds(bbox);
         
        }
        
      ).addTo(map);
      return () => map.removeControl(geocoder);
    }, []);
  
    return null;
  }
  export default Search;