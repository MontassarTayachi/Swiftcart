import { TbMapPinShare } from "react-icons/tb";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Search from "./Search";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Correct the display issue of markers with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const redIcon = new L.Icon({
  iconUrl: "https://png.pngtree.com/png-vector/20220603/ourmid/pngtree-red-icon-tag-location-elegant-png-image_4810864.png",
  shadowUrl: markerShadow,
  iconSize: [35, 52],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle the location marker
function LocationMarker({ setFormData }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const newPosition = e.latlng;
      setFormData(prevState => ({ ...prevState, latitude: newPosition.lat, longitude: newPosition.lng }));
      setPosition(newPosition);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Position sélectionnée</Popup>
    </Marker>
  );
}

function LocateControl() {
  const map = useMap();

  const locateUser = (event) => {
    event.stopPropagation();
    map.locate({ enableHighAccuracy: true }).on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
      L.marker(e.latlng, { icon: redIcon }).addTo(map)
        .bindPopup("You are here").openPopup();
    }).on("locationerror", function (e) {
      alert("Access to position denied.");
    });
  };

  return (
    <button onClick={(event) => locateUser(event)} style={{
      position: 'absolute',
      bottom: 50,
      right: 10,
      zIndex: 1000,
      borderRadius: '50%',
      height: '50px',
      width: '50px',
      padding: '10px',
      backgroundColor: 'blue',
      color: 'white',
      borderColor: 'white',
      cursor: 'pointer',
      fontSize: '1.5em'
    }}>
      <TbMapPinShare />
    </button>
  );
}

const Put_address_to_map = ({ setFormData, formData }) => {
  const initialCenter = [37.04668292145353, 9.64960825999084]; // Initial position
  const [center, setCenter] = useState(
    formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : initialCenter
  );

  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setCenter([formData.latitude, formData.longitude]);
    }
  }, [formData.latitude, formData.longitude]);

  return (
    <MapContainer center={center} zoom={55} style={{ width: '100%', height: '400px' }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        formData.latitude && formData.longitude && (
          <Marker position={[formData.latitude, formData.longitude]}>
            <Popup>Position sélectionnée</Popup>
          </Marker>
        )
      }
      <Search />
      <LocationMarker setFormData={setFormData} />
      <LocateControl />
    </MapContainer>
  );
};

export default Put_address_to_map;
