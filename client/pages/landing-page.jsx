import React, { useContext } from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default function LandingPage({ guestSignIn, handleSignIn }) {
  const { user } = useContext(AppContext);
  if (user) return <Redirect to="#" />;
  return (
    <div className='container'>
      <div className='row m-5 text-center'>
        {window.location.hash === '#sign-up'
          ? <h1>Sign Up</h1>
          : <h1>Sign In</h1>}
      </div>
      <AuthForm guestSignIn={guestSignIn} handleSignIn={handleSignIn} />
    </div>
  );
}
