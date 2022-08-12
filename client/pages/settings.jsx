import React from 'react';
import Navbar from '../components/navbar';

export default function Settings(props) {

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='text-center m-5'>Settings</h1>
        <form>
          <div className='row'>
            <div className='col ms-3'>
              <p>First Name</p>
            </div>
            <div className='col text-end me-3'>
              <input className='settings-input' value='James' type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Last Name</p>
            </div>
            <div className='col text-end me-3'>
              <input className='settings-input' value='Ding' type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Email</p>
            </div>
            <div className='col text-end me-3'>
              <input className='settings-input' size='35' value='jamesding@example.com' type='text'></input>
            </div>
          </div>
          <hr></hr>
          <div className='row'>
            <div className='col ms-3 mt-4'>
              <p>Avatar</p>
            </div>
            <div className='col text-end me-3'>
              <p className='d-inline-flex me-2 theme-color'>Change</p>
              <img className='review-image' src='https://avatars.githubusercontent.com/u/103629526?v=4' />
            </div>
          </div>
          <hr></hr>
        </form>
      </div>

    </>
  );
}
