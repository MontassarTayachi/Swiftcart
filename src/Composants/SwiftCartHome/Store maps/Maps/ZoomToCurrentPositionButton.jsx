import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { TbMapPinShare } from "react-icons/tb"; 

function ZoomToCurrentPositionButton({ position }) {
  const map = useMap();

  const zoomToCurrentPosition = () => {
    map.setView(position, 50);
  };

  // Ajout d'un style pour positionner le bouton
  const buttonStyle = {
    position: 'absolute',
    bottom: '40px', // Ajustez en fonction de l'emplacement souhaité
    right: '40px',
    backgroundColor: '#0096FF',
    padding: '5px',
    borderColor: 'white',
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2000
  };

  return (
    <button style={buttonStyle} onClick={zoomToCurrentPosition}>
      <TbMapPinShare size={24} color="white" />
    </button>
  );
}

export default ZoomToCurrentPositionButton;
