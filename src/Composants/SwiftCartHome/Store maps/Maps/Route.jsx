import React, { useEffect, useState } from 'react';
import { MapContainer, Marker,Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import closeIcon from '../../../../assets/images/maps/close.png'; 
function Route({ from, to ,setTo}) {
    const map = useMap();
  
    useEffect(() => {
      if (!map || !from || !to) return;
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(from), L.latLng(to)],
        lineOptions: { styles: [{ color: 'blue', opacity: 0.7, weight: 8}] },
        geocoder: L.Control.Geocoder.nominatim(),
        routeDragInterval: 50,
        addWaypoints: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function() { return null; } 
      }).addTo(map);
      const onCustomButtonClick = () => {
       setTo(null)
      };

      // Ajouter un bouton personnalisé au contrôle de géocodage
      const addButtonToGeocoder = () => {
        let geocoderElement = document.querySelector('.leaflet-routing-geocoders');
        if (geocoderElement) {
          let button = document.createElement('button');
          button.style.backgroundImage = `url(${closeIcon})`;
          button.style.backgroundSize = 'contain';
          button.style.width = '25px';
          button.style.height = '25px';
          button.style.border = 'none';
          button.style.backgroundRepeat = 'no-repeat';
          button.style.backgroundColor = 'transparent';
          button.style.cursor = 'pointer';
          button.onclick = onCustomButtonClick;
          button.style.order = '1';
          geocoderElement.appendChild(button);
        }
      };

      // Assurez-vous que le bouton est ajouté après que le contrôle de géocodage a été chargé
      setTimeout(addButtonToGeocoder, 1000); // Utilisez setTimeout comme solution temporaire

      return () => {
       
          map.removeControl(routingControl);
        
      };
    }, [map, from, to]); 
    return null;
  }
  export default Route;