import React, { useState, useEffect } from 'react';
import parseRoute from '../lib/parse-route';
import Rating from '../components/rating';
import NotFound from './not-found';
import LoadAnimation from '../components/loadAnimation';
import Hours from '../components/hours';

export default function Details(props) {

  const [detailsFound, setDetailsFound] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    rating: null,
    review_count: null,
    phone: '',
    photos: [],
    hours: [],
    location: ''
  });

  useEffect(() => {
    handleDetails();
  }, []);

  const handleDetails = async () => {
    const { params } = parseRoute(window.location.hash);
    const businessId = params.get('businessId');
    try {
      const res = await fetch(`/api/yelp/${businessId}`);
      const details = await res.json();
      if (details.total === 0) {
        setDetailsFound(false);
      } else {
        setDetailsFound(true);
        setTimeout(() => setDetails({
          name: details.name,
          rating: details.rating,
          review_count: details.review_count,
          phone: details.phone,
          photos: details.photos,
          hours: details.hours,
          location: `${details.coordinates?.latitude},${details.coordinates?.longitude}`
        }), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const endHour = details.hours[0]?.open[day].end.slice(0, 2);
  const endMinutes = details.hours[0]?.open[day].end.slice(-2);

  if (detailsFound === true && details.name === '') {
    return <LoadAnimation />;
  }

  if (!detailsFound) {
    return <NotFound />;
  } else {
    return (
      <>
        <div className='row'>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={details.photos[0]} className="d-block w-100 carousel-img" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={details.photos[1]} className="d-block w-100 carousel-img" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={details.photos[2]} className="d-block w-100 carousel-img" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='row pt-4 padding-left'>
          <div className='col'>
            <h1>{details.name}</h1>
            <Rating rating={details.rating} />
            <span>{details.review_count}</span>
            {
              details.hours[0]?.is_open_now &&
              (
                <p className='pt-2'>
                  <span className='text-success'>Open</span>
                  {` until ${endHour % 12}:${endMinutes} ${endHour >= 12 ? 'PM' : 'AM'}`}
                </p>
              )
            }
            {
              !details.hours[0]?.is_open_now &&
              (
                <p className='text-danger'>Closed</p>
              )
            }
          </div>
        </div>
        <hr />
        <div className='row pt-3'>
          <div className='col text-center'>
            <i className="fa-solid fa-circle-plus theme-color fa-2xl"></i>
            <p className='pt-1'>Review</p>
          </div>
          <div className='col text-center'>
            <a href={`tel:${details.phone}`}>
              <i className="fa-solid fa-phone theme-color fa-2xl"></i>
              </a>
            <p className='pt-1'>Call</p>
          </div>
          <div className='col text-center'>
            <button type="button" className="hours-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="fa-solid fa-clock theme-color fa-2xl"></i>
            </button>
            <p className='pt-1'>Hours</p>
          </div>
          <div className='col text-center'>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${details.location}`}>
              <i className="fa-solid fa-diamond-turn-right theme-color fa-2xl"></i>
              </a>
            <p className='pt-1'>Directions</p>
          </div>
        </div>
        <hr />
        <Hours hours={details.hours[0].open} />
      </>
    );
  }
}
