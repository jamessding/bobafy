import React from 'react';
import Rating from './rating';

export default function List({ isOpen, results, isMobile }) {

  if (!isMobile) {
    return (
      <div className='list-container'>
        {
          results.map(result => {
            return (
              <div key={result.id} className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-0">
                  <div className="col-4">
                    <img src={result.image_url} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{result.name}</h5>
                      <p className="card-text"><Rating rating={result.rating} /> {result.review_count}&nbsp;{result.price}</p>
                      <p className="card-text"><small className="text-muted">{(result.distance / 1609.344).toFixed(1)}&nbsp;Miles</small></p>
                      <p className="card-text"><small className="text-muted">{result.location.address1},&nbsp;{result.location.city}</small></p>
                      <p className="card-text"><small className="text-muted">{result.transactions ? result.transactions.map(transaction => transaction[0].toUpperCase() + transaction.substring(1) + ' ') : null}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div className={isOpen ? 'list-container transition-right' : 'list-container transition-left'}>
        {
          results.map(result => {
            return (
              <div key={result.id} className="card mb-3" style={{ maxWidth: 540 }}>
                <div className="row g-0">
                  <div className="col-4">
                    <img src={result.image_url} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{result.name}</h5>
                      <p className="card-text"><Rating rating={result.rating} /> {result.review_count}&nbsp;{result.price}</p>
                      <p className="card-text"><small className="text-muted">{(result.distance / 1609.344).toFixed(1)}&nbsp;Miles</small></p>
                      <p className="card-text"><small className="text-muted">{result.location.address1},&nbsp;{result.location.city}</small></p>
                      <p className="card-text"><small className="text-muted">{result.transactions ? result.transactions.map(transaction => transaction[0].toUpperCase() + transaction.substring(1) + ' ') : null}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

}
