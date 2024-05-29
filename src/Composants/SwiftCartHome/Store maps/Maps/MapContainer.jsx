import { AiOutlineDoubleRight } from 'react-icons/ai'
import { BsFillSignTurnRightFill } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import { Rate } from 'antd'
import Route from './Route'
import Search from './Search'
import Store_Location from '../../../../assets/images/maps/Store_icon.png'
import Curent_Location from '../../../../assets/images/maps/Curent_Location.png'
import ZoomToCurrentPositionButton from './ZoomToCurrentPositionButton'
import './MapStyle.css'
import { Link } from 'react-router-dom'
import GoTo from './GoTo'
const redIcon = new L.Icon({
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    iconUrl: Store_Location // Vous devez fournir le chemin vers votre icône rouge ici
})
const Current_Position = new L.Icon({
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    iconUrl: Curent_Location // Vous devez fournir le chemin vers votre icône rouge ici
})

function Mapcontainer({ open, stores, storeSearch }) {
    const [open1, setOpen1] = open
    const OpenSearch = () => {
        return (
            <>
                {!open1 ? (
                    <button className='OpenSearchButtonMap89' onClick={() => setOpen1(!open1)}>
                        <AiOutlineDoubleRight />
                    </button>
                ) : null}
            </>
        )
    }

    const [to, setTo] = useState(null)

    function Markers({ store }) {
        return (
            <Marker icon={redIcon} position={[store.latitude, store.longitude]}>
                <Popup>
                    <div className='MarkersStores4598'>
                        <h1>{store.name}</h1>
                        <img src={store.profile_image} alt={store.name} style={{ width: '70px', height: '70px', borderRadius: '5px', objectFit: 'cover' }} />
                        <Rate disabled defaultValue={4} value={store.rating} />
                        <button onClick={() => setTo([store.latitude, store.longitude])}>
                            <BsFillSignTurnRightFill style={{ marginRight: '5px' }} />
                            itinerary
                        </button>
                        <Link to={`/Swiftcart/StorePage/${store.id}`}>View Store</Link>
                    </div>
                </Popup>
            </Marker>
        )
    }
    const [currentUserPosition, setCurrentUserPosition] = useState(null)

    // Fetch user's current position when the component mounts
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setCurrentUserPosition([latitude, longitude])
            },
            err => {
                console.error(err)
                // Fallback to a default position if access to the user's location is denied
                setCurrentUserPosition([37.0452331, 9.6494951]) // Default to London as a fallback
            }
        )
    }, [])

    // Wait for the user's position to be fetched before rendering the map
    if (!currentUserPosition) {
        return <div>Loading...</div>
    }

    return (
        <MapContainer center={currentUserPosition} zoom={10} style={{ width: '100%', height: '85vh' }} scrollWheelZoom={false}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Search setTo={setCurrentUserPosition} />
            <Marker icon={Current_Position} position={currentUserPosition}>
                <Popup>
                    <div>
                        <p>Latitude: {currentUserPosition[0]}</p>
                        <p>Longitude: {currentUserPosition[1]}</p>
                    </div>
                </Popup>
            </Marker>
            <Route setTo={setTo} from={currentUserPosition} to={to} /> {stores.length > 0 && stores.map((store, index) => store.longitude && store.latitude && <Markers key={index} store={store} />)}
            <OpenSearch />
            {storeSearch.length > 0 && <GoTo position={storeSearch} />}
            <ZoomToCurrentPositionButton position={currentUserPosition} />
        </MapContainer>
    )
}
export default Mapcontainer
