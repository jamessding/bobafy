import React from 'react';

export default function LoadAnimation(props) {
  return (
    <>
      <div className='row'>
        <div className='col text-center mt-5'>
          <h2 className=''>Loading boba...</h2>
        </div>
      </div>
      <div className='row justify-content-center'>
        <img className='loading-gif' src='https://c.tenor.com/YUF4morhOVcAAAAC/peach-cat-boba-tea.gif'></img>
      </div>
    </>
  );
}
