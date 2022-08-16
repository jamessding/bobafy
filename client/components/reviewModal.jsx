import React, { useState, useRef } from 'react';

export default function ReviewModal({ onSubmit, name, businessId }) {
  const fileInputRef = useRef(null);
  const [review, setReview] = useState({
    drinkType: 'Milk Tea',
    content: '',
    recommend: false
  });

  const handleChange = e => {
    setReview(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRecommend = e => {
    setReview(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    formData.append('drinkType', review.drinkType);
    formData.append('content', review.content);
    formData.append('recommend', review.recommend);
    formData.append('businessId', businessId);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData
      });
      const review = await response.json();
      onSubmit(review);
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
                <select name='drinkType' required className="form-select" id="exampleSelectType" aria-label="Default select example" value={review.drinkType} onChange={handleChange}>
                  <option value="Milk Tea">Milk Tea</option>
                  <option value="Fruit Tea">Fruit Tea</option>
                  <option value="Fresh Tea">Fresh Tea</option>
                  <option value="Fruit Slush">Fruit Slush</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">How was your experience?</label>
                <textarea name='content' className="form-control" id="exampleFormControlTextarea1" rows="3" value={review.content} onChange={handleChange}></textarea>
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
                  <input name='recommend' className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={review.recommend}
                    onChange={handleRecommend}/>
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
