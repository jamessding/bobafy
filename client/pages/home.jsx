import React from 'react';
import Map from '../components/map';
import { useLoadScript } from '@react-google-maps/api';

export default function Home(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
      <Map />
  );
}
