import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

export default function Map(props) {
  const [currentPosition, setCurrentPosition] = useState({ lat: 33.6349, lng: -117.7405 });
  const [yelpResults, setYelpResults] = useState([]);

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    setCurrentPosition(currentPosition);
  };

  const onMarkerDragEnd = e => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(success);
  }, []);

  useEffect(() => {
    const handleYelpResults = async () => {
      try {
        fetch(`/api/yelp/search/${currentPosition.lat},${currentPosition.lng}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(result => {
            setYelpResults(result);
          });
      } catch (err) {
        console.error(err);
      }
    };
    handleYelpResults();
  }, [currentPosition.lat, currentPosition.lng]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={13}
      >
        {
          yelpResults.map(result => {
            return (
              <Marker
                key={result.id}
                position={{ lat: result.coordinates.latitude, lng: result.coordinates.longitude }}
              />
            );
          })
        }
        <Marker
          position={currentPosition}
          onDragEnd={e => onMarkerDragEnd(e)}
          draggable={true} />
      </GoogleMap>
    </LoadScript>
  );
}
