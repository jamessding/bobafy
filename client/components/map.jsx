/* global google */
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Rating from './rating';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const styles = [
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
];

export default function Map(props) {
  const [currentPosition, setCurrentPosition] = useState({ lat: 33.6349, lng: -117.7405 });
  const [yelpResults, setYelpResults] = useState([]);
  const [selected, setSelected] = useState({});

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

  const onSelect = item => {
    setSelected(item);
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
        options={{ styles }}
      >
        {
          yelpResults.map(result => {
            return (
              <Marker
                key={result.id}
                position={{ lat: result.coordinates.latitude, lng: result.coordinates.longitude }}
                onClick={() => onSelect(result)}
                icon={{
                  url: 'https://cdn-icons-png.flaticon.com/512/7301/7301959.png',
                  scaledSize: new google.maps.Size(50, 50)
                }}
                animation={google.maps.Animation.DROP}
              />
            );
          })
        }
        {
          selected.location &&
          (
            <InfoWindow
              position={{ lat: selected.coordinates.latitude, lng: selected.coordinates.longitude }}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <>
                <p>{selected.name}</p>
                <Rating rating={selected.rating} />
                <img className='info-image' src={selected.image_url}></img>
              </>
            </InfoWindow>
          )
        }
        <Marker
          position={currentPosition}
          onDragEnd={e => onMarkerDragEnd(e)}
          draggable={true} />
      </GoogleMap>
    </LoadScript>
  );
}
