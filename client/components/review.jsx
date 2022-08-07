import React from 'react';

export default function Review({ name }) {

  return (
    <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="reviewModalLabel">{name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleSelectType" className="form-label">What kind of boba did you order?</label>
                <select required className="form-select" id="exampleSelectType" aria-label="Default select example">
                  <option value="milk-tea" selected>Milk Tea</option>
                  <option value="fruit-tea">Fruit Tea</option>
                  <option value="fresh-tea">Fresh Tea</option>
                  <option value="fruit-slush">Fruit Slush</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">How was your experience?</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Attach Photos</label>
                <input className="form-control" type="file" id="formFile" />
              </div>
              <div className="mb-3">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Would you recommend this to a friend?</label>
                </div>
              </div>
              <button type="submit" className="btn bg-theme">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
