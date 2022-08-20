import React, { useContext } from 'react';
import Map from '../components/map';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default function Home(props) {
  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;
  return (
    <>
      <Map />
    </>
  );
}
