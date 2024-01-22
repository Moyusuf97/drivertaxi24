import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };

const DriverMapComponent = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [driverMarker, setDriverMarker] = useState(null);
  const [error, setError] = useState('');
  const apiKey = process.env.REACT_APP_ACCESS_KEY;
  const zoneRadius = 1000; // Radius in meters

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setDriverMarker({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error(err);
        setError('Failed to fetch location.');
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    mapCenter && (
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
          {driverMarker && <Marker position={driverMarker} />}
          {driverMarker && (
            <Circle
              center={driverMarker}
              radius={zoneRadius}
              options={{
                strokeColor: '#ff0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#ff0000',
                fillOpacity: 0.35,
              }}
            />
          )}
        </GoogleMap>
        {error && <div>{error}</div>}
      </LoadScript>
    )
  );
};

export default React.memo(DriverMapComponent);