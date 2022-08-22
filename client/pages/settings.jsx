import React, { useState, useEffect, useRef, useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function Settings(props) {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: ''
  });
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();

  const handleChange = e => {
    setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      fetch('/api/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(result => {
          setUserDetails({
            firstName: result[0]?.firstName,
            lastName: result[0]?.lastName,
            email: result[0]?.email,
            avatarUrl: result[0]?.avatarUrl
          });
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
    formData.append('firstName', userDetails.firstName);
    formData.append('lastName', userDetails.lastName);
    formData.append('email', userDetails.email);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setUserDetails({
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        avatarUrl: result.avatarUrl
      });
      fileInputRef.current.value = null;
      window.location.hash = '#';
    } catch (err) {
      console.error(err);
    }
  };

  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  return (
    <>
      <div className='container'>
        <h1 className='text-center m-5'>Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col ms-3'>
              <p>First Name</p>
            </div>
            <div className='col text-end me-3'>
              <input name='firstName' onChange={handleChange} className='settings-input' defaultValue={userDetails.firstName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Last Name</p>
            </div>
            <div className='col text-end me-3'>
              <input name='lastName' onChange={handleChange} className='settings-input' defaultValue={userDetails.lastName} type='text'></input>
            </div>
          </div>
          <hr className='margin-bottom'></hr>
          <div className='row'>
            <div className='col ms-3'>
              <p>Email</p>
            </div>
            <div className='col text-end me-3'>
              <input name='email' onChange={handleChange}className='settings-input' size='35' defaultValue={userDetails.email} type='text'></input>
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
                  <img className='preview-image' src={userDetails.avatarUrl} />
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
