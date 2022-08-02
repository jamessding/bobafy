import React, { useState, useEffect } from 'react';
import Rating from './rating';

export default function List(props) {
  return (
    props.results.map(result => {
      return (
      <p key={result.id}>{result.name}</p>
      );
    })
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-12 mt-3">
    //       <div className="card">
    //         <div className="card-horizontal">
    //           <div className="img-square-wrapper">
    //             <img
    //               className=""
    //               src="http://via.placeholder.com/300x180"
    //               alt="Card image cap"
    //             />
    //           </div>
    //           <div className="card-body">
    //             <h4 className="card-title">Card title</h4>
    //             <p className="card-text">
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </p>
    //             <p>
    //               Example from: https://codepen.io/SteveJRobertson/pen/POdvgz
    //             </p>
    //           </div>
    //         </div>
    //         <div className="card-footer">
    //           <small className="text-muted">Last updated 3 mins ago</small>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
