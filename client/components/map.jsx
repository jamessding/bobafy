import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

export default function Map(props) {
  return (
    <GoogleMap
      zoom={16}
      center={{ lat: 33.6349388, lng: -117.7405293 }}
      mapContainerClassName="map-container"
    />
  );
}
