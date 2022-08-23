import React, { useState } from 'react';

export default function AuthForm({ handleSignIn, guestSignIn }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleSubmit = async event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    if (window.location.hash === '#sign-up') {
      try {
        await fetch('/api/auth/sign-up', req);
        window.location.hash = '#sign-in';
        setUserInfo({ username: '', password: '' });
      } catch (err) {
        console.error(err);
      }
    } else if (window.location.hash === '#sign-in') {
      try {
        const res = await fetch('/api/auth/sign-in', req);
        const data = await res.json();
        handleSignIn(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label"></label>
        <input
          required
          autoFocus
          id="username"
          placeholder='Username'
          value={userInfo.username}
          type="text"
          name="username"
          onChange={handleChange}
          className="form-control bg-light" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label"></label>
        <input
          required
          id="password"
          placeholder='Password'
          value={userInfo.password}
          type="password"
          name="password"
          onChange={handleChange}
          className="form-control bg-light" />
      </div>
      <div className="text-center">
        {window.location.hash === '#sign-up'
          ? <button type='submit' className='orange-button mt-5 mb-1' >SIGN UP</button>
          : <button type='submit' className='orange-button mt-5 mb-1' >SIGN IN</button>}
          {window.location.hash === '#sign-up'
            ? <p>Already have an account? <a href='#sign-in' className='sign-in-up'>Sign in!</a></p>
            : <p>Don&apos;t have an account? <a href='#sign-up' className='sign-in-up'>Sign up!</a></p>}
      </div>
      <div className='text-center'>
        <button type='button' onClick={guestSignIn} className='orange-button'>GUEST SIGN IN</button>
      </div>
    </form>
  );
}
