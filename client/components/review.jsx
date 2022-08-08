import React, { useState } from 'react';

export default function Review({ onSubmit, name, businessId }) {

  const [drinkType, setDrinkType] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [recommend, setRecommend] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const body = { drinkType, content, imageUrl, recommend, businessId };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    try {
      const review = await fetch('/api/reviews', req);
      onSubmit(review);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="reviewModalLabel">{name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleSelectType" className="form-label">What kind of boba did you order?</label>
                <select required className="form-select" id="exampleSelectType" aria-label="Default select example" value={drinkType} onChange={event => setDrinkType(event.target.value)}>
                  <option value="milk-tea">Milk Tea</option>
                  <option value="fruit-tea">Fruit Tea</option>
                  <option value="fresh-tea">Fresh Tea</option>
                  <option value="fruit-slush">Fruit Slush</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">How was your experience?</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={event => setContent(event.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Attach Photos</label>
                <input className="form-control" type="file" id="formFile" value={imageUrl}
                  onChange={event => setImageUrl(event.target.value)}/>
              </div>
              <div className="mb-3">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={recommend}
                    onChange={event => setRecommend(event.target.value)}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Would you recommend this to a friend?</label>
                </div>
              </div>
              <button type="submit" className="btn bg-theme" data-bs-dismiss="modal">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
