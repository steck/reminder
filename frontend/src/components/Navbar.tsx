import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/path/to/logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          Remainer
        </a>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2">Login</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
