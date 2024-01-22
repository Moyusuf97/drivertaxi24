import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };

const DriverMapComponent = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [driverMarker, setDriverMarker] = useState(null);
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
        setMapCenter({ lat: 59.334591, lng: 18.063240 }); 
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Define the points in the polygon
  const zonePolygonPath = [
    { lat: 59.340597, lng: 18.058278 }, 
    { lat: 59.340597, lng: 18.068303 }, 
    { lat: 59.330570, lng: 18.068303 }, 
    { lat: 59.330570, lng: 18.058278 }  
  ];

  // Polygon options
  const polygonOptions = {
    fillColor: "lightblue",
    fillOpacity: 0.4,
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
        {driverMarker && <Marker position={driverMarker} />}
        <Polygon
          paths={zonePolygonPath}
          options={polygonOptions}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(DriverMapComponent);