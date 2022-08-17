import React from 'react';
import AuthForm from '../components/auth-form';

export default function LandingPage({ guestSignIn, handleSignIn }) {
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
