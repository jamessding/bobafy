import React from 'react';

export default function Reviews({ reviews }) {
  let counter = 0;
  return (
    <>
      {
        reviews.map(review => {
          return (
            <div key={counter++} className='row pt-3'>
              <div className='col-3 text-center'>
                <img className="avatar-image" src="https://avatars.githubusercontent.com/u/103629526?v=4" />
              </div>
              <div className='col-6'>
                {
                  review.recommend &&
                  (
                    <h6> James <span className="text-success">recommends</span> {review.drinkType}.</h6>
                  )
                }
                {
                  !review.recommend &&
                  (
                    <h6> James does <span className="text-danger">not recommend</span> {review.drinkType}.</h6>
                  )
                }
                <p>{review.content}</p>
              </div>
              <div className='col-3 text-center'>
                <img className="review-image" src={review.imageUrl} />
              </div>
            </div>
          );
        })
      }
    </>
  );
}
