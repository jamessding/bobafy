import React from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';

export default function LandingPage({ signedIn, guestSignIn, handleSignIn }) {
  if (signedIn) return <Redirect to="#" />;
  return (
    <div>
      <div className='row'>
        {window.location.hash === '#sign-up'
          ? <p>Sign Up</p>
          : <p>Sign In</p>}
      </div>
      <AuthForm guestSignIn={guestSignIn} handleSignIn={handleSignIn} />
    </div>
  );
}
