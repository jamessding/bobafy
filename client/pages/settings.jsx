import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';

export default function Settings(props) {
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      fetch('/api/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          setUserDetails(result);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarUrl(e.target.files[0]);
    }
  };

  // for submitting changes in settings
  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', fileInputRef.current.files[0]);
  //   formData.append('drinkType', drinkType);
  //   formData.append('content', content);
  //   formData.append('recommend', recommend);
  //   formData.append('businessId', businessId);
  //   try {
  //     const response = await fetch('/api/reviews', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     const review = await response.json();
  //     onSubmit(review);
  //     fileInputRef.current.value = null;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='text-center m-5'>Settings</h1>
        <form>
          {/* onSubmit={handleSubmit} */}
          <div className='row'>
            <div className='col ms-3'>
              <p>First Name</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setFirstName(event.target.value)} className='settings-input' defaultValue={userDetails[0]?.firstName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Last Name</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setLastName(event.target.value)} className='settings-input' defaultValue={userDetails[0]?.lastName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Email</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setEmail(event.target.value)}className='settings-input' size='35' defaultValue={userDetails[0]?.email} type='text'></input>
            </div>
          </div>
          <hr></hr>
          <div className='row'>
            <div className='col ms-3 mt-4'>
              <p>Avatar</p>
            </div>
            <div className='col text-end me-3'>
              <label htmlFor='files' className='change-button d-inline-flex me-2 theme-color'>Change</label>
              <input
                className="file"
                id="files"
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .gif" />
              {
                !avatarUrl
                  ? (
                  <img className='preview-image' src={userDetails[0]?.avatarUrl} />
                    )
                  : <img className='preview-image' src={URL.createObjectURL(avatarUrl)} />
              }
            </div>
          </div>
          <hr></hr>
          <div className='mb-3 text-center'>
            <button className='orange-button'>Save Changes</button>
          </div>
        </form>
      </div>

    </>
  );
}
