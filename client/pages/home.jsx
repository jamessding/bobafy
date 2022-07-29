import React from 'react';
import Map from '../components/map';

export default function Home(props) {
  return (
    <Map />
  );
}

// return (
//   navigator.geolocation.getCurrentPosition(function (position) {
//     return (
//       <Map maps={{ lat: position.coords.latitude, lng: position.coords.longitude }} />
//     );
//   })
// );
