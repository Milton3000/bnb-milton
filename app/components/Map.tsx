"use client"

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    return (
        <MapContainer
            scrollWheelZoom={false}
            className="h-[50vh] rounded-lg relative z-0"
            center={[52.505, -0.09]}
            zoom={13}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}