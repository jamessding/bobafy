import React, { useState, useRef } from 'react';

export default function ReviewModal({ onSubmit, name, businessId }) {

  const [drinkType, setDrinkType] = useState('Milk Tea');
  const [content, setContent] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const body = { drinkType, content, recommend, businessId };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch('/api/reviews', req);
      const review = await response.json();
      onSubmit(review);
      handleFileUpload(review.reviewId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async reviewId => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('reviewId', reviewId);
    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData
      });
      const review = await response.json();
      onSubmit(review);
      setCaption('');
      fileInputRef.current.value = null;
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
                  <option value="Milk Tea">Milk Tea</option>
                  <option value="Fruit Tea">Fruit Tea</option>
                  <option value="Fresh Tea">Fresh Tea</option>
                  <option value="Fruit Slush">Fruit Slush</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">How was your experience?</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={event => setContent(event.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Caption
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  id="caption"
                  name="caption"
                  value={caption}
                  onChange={event => setCaption(event.target.value)}
                  className="form-control bg-light" />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <input
                  required
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  accept=".png, .jpg, .jpeg, .gif" />
              </div>
              <div className="mb-3">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={recommend}
                    onChange={event => setRecommend(event.target.checked)}/>
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
