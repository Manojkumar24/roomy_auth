import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Roomy</h1>
          <p className='lead'>Your Room, your choice... </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up as an Owner
            </Link>
            <Link to='/register_cust' className='btn btn-primary'>
              Sign Up as a Customer
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
