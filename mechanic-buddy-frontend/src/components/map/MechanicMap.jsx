import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Star, Wrench, Navigation, CheckCircle } from 'lucide-react';

// Custom Leaflet Pins
const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const mechanicIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const MechanicMap = ({ mechanics = [], onBookMechanic, userLat = 12.9716, userLng = 77.5946 }) => {
  const position = [userLat, userLng];

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-0">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Current Location Pin */}
        <Marker position={position} icon={userIcon}>
          <Popup>
            <div className="text-gray-900 font-sans p-1">
              <div className="font-bold text-sm flex items-center gap-1 text-red-600">
                <MapPin className="w-4 h-4" /> Your Current Breakdown Location
              </div>
              <p className="text-xs text-gray-600 mt-1">Lat: {userLat.toFixed(4)}, Lng: {userLng.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>

        {/* Mechanic Pins */}
        {mechanics.map((m) => {
          const mLat = m.latitude || (userLat + (Math.random() - 0.5) * 0.04);
          const mLng = m.longitude || (userLng + (Math.random() - 0.5) * 0.04);
          return (
            <Marker key={m.id} position={[mLat, mLng]} icon={mechanicIcon}>
              <Popup>
                <div className="text-gray-900 font-sans p-2 min-w-[200px]">
                  <div className="font-bold text-sm text-indigo-700 flex items-center justify-between">
                    <span>{m.workshopName || m.user?.name}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">★ {m.rating || 4.8}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{m.address}</p>
                  <p className="text-xs text-indigo-600 font-semibold mt-1">Rate: ₹{m.hourlyRate}/hr</p>
                  <button
                    onClick={() => onBookMechanic && onBookMechanic(m)}
                    className="mt-3 w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow transition"
                  >
                    Request Emergency Assistance
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
