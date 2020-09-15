import React from 'react';
import NavBar from './NavBar';

const Base = ({
  title = 'My Title',
  description = 'My description',
  className = 'bg-dark text-white',
  children,
}) => (
  <div>
    <NavBar />
    <div className="container-fluid">
      <div className="bg-dark text-white text-center p-4">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-1">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you have any question, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An amazing place to buy <span className="text-white">Tshirt</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
