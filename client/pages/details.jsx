import React, { useState, useEffect } from 'react';
import parseRoute from '../lib/parse-route';

export default function Details({ businessId }) {

  const [businessDetails, setBusinessDetails] = useState({});

  useEffect(() => {
    handleDetails();
  }, []);

  const handleDetails = async () => {
    const { params } = parseRoute(window.location.hash);
    const businessId = params.get('businessId');
    try {
      fetch(`/api/yelp/${businessId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(result => {
          setBusinessDetails(result);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{businessDetails.name}</h1>
    </div>
  );
}
