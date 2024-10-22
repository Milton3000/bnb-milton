"use client"

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
    iconUrl: "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [50, 41]
})

export default function Map({locationValue}: {locationValue: string}) {
    const { getCountryByValue } = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLang;

    return (
        <MapContainer
            scrollWheelZoom={true}
            className="h-[50vh] rounded-lg relative z-0"
            center={latLang ?? [52.505, -0.09]}
            zoom={10}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={latLang ?? [52.505, -0.09]} icon={ICON}/>
        </MapContainer>
    );
}