import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };

const DriverMap = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [driverMarker, setDriverMarker] = useState(null);
  const [error, setError] = useState('');
  const apiKey = process.env.REACT_APP_ACCESS_KEY;

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
        </GoogleMap>
        {error && <div>{error}</div>}
      </LoadScript>
    )
  );
};

export default React.memo(DriverMap);
