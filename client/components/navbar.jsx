import React from 'react';

export default function Navbar({ route, handleSignOut }) {
  return (
    <nav className="navbar navbar-dark bg-theme">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/favicon-32x32.png" alt="" className="d-inline-block align-text-top" />
            Bobafy
        </a>
        {
          (!route.path.includes('sign-in') && !route.path.includes('sign-up')) &&
          (
            <>
              <button className="menu-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <i className="fa-solid fa-bars fa-2xl text-light"></i>
              </button>
              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                  <h2 id="offcanvasRightLabel">Menu</h2>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <a href='#activity' className="nav-link mb-3 d-block">Activity</a>
                  <a href='#settings' className="nav-link mb-3 d-block">Settings</a>
                  <a href='#sign-in' onClick={handleSignOut} className="nav-link mb-3 d-block">Sign Out</a>
                </div>
              </div>
            </>
          )
        }
      </div>
    </nav>
  );
}
