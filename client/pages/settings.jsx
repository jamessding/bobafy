import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';

export default function Settings(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();

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
          setFirstName(result[0].firstName);
          setLastName(result[0].lastName);
          setEmail(result[0].email);
          setAvatarUrl(result[0].avatarUrl);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setFirstName(result.firstName);
      setLastName(result.lastName);
      setEmail(result.email);
      setAvatarUrl(result.avatarUrl);
      fileInputRef.current.value = null;
      window.location.hash = '#';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='text-center m-5'>Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col ms-3'>
              <p>First Name</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setFirstName(event.target.value)} className='settings-input' defaultValue={firstName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Last Name</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setLastName(event.target.value)} className='settings-input' defaultValue={lastName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Email</p>
            </div>
            <div className='col text-end me-3'>
              <input onChange={event => setEmail(event.target.value)}className='settings-input' size='35' defaultValue={email} type='text'></input>
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
                !selectedImage
                  ? (
                  <img className='preview-image' src={avatarUrl} />
                    )
                  : <img className='preview-image' src={URL.createObjectURL(selectedImage)} />
              }
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='text-center'>
            <button className='orange-button'>Save Changes</button>
          </div>
        </form>
      </div>

    </>
  );
}
