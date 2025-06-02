'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

interface LeafletMapProps {
  position: LatLngTuple;
}

const customIcon = new L.DivIcon({
  html: `
    <div style="transform: translate(-50%, -50%)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" viewBox="0 0 24 24">
        <path d="M12 2C8.134 2 5 5.134 5 9c0 4.676 6.151 11.204 6.469 11.531a1 1 0 0 0 1.062 0C12.849 20.204 19 13.676 19 9c0-3.866-3.134-7-7-7zm0 13a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
      </svg>
    </div>
  `,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function RecenterMap({ position }: { position: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position]);
  return null;
}

export default function LeafletMap({ position }: LeafletMapProps) {
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>(position);
  const [view, setView] = useState<'map' | 'satellite'>('map');
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const reverseGeocode = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await res.json();
        const displayName = data.display_name;
        setAddress(displayName || 'Unknown location');
      } catch (err) {
        console.error('Reverse geocoding error:', err);
        setAddress('Unable to fetch address');
      }
    };

    if (typeof window !== 'undefined' && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentPosition([lat, lng]);
          reverseGeocode(lat, lng);
        },
        (err) => {
          console.error('Geolocation error:', err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  const satelliteURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const osmURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div>
      <div className="mb-2">
        <button
          onClick={() => setView(view === 'map' ? 'satellite' : 'map')}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Switch to {view === 'map' ? 'Satellite' : 'Map'} View
        </button>
      </div>
      <MapContainer center={currentPosition} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution={
            view === 'map'
              ? '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              : '&copy; <a href="https://www.esri.com/">Esri</a>'
          }
          url={view === 'map' ? osmURL : satelliteURL}
        />

        {view === 'satellite' && (
          <TileLayer
            attribution='&copy; <a href="https://www.arcgis.com/">Esri Labels</a>'
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <Marker position={currentPosition} icon={customIcon}>
          <Popup>
            <strong>You are here</strong>
            <br />
            {address || 'Fetching address...'}
          </Popup>
        </Marker>
        <RecenterMap position={currentPosition} />
      </MapContainer>
    </div>
  );
}
