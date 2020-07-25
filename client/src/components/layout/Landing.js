import React from 'react';
import { Link } from 'react-router-dom';
import "./landing.css"

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Roomy</h1>
          <p className='lead'>Your Room, your choice... </p>
          <div className=''>
            <Link to='/register' >
             <button class="button2"> Sign Up as an Owner </button>
            </Link>
            <Link to='/register_cust' >
            <button className="button2">Sign Up as a Customer</button>
            </Link>
            <Link to='/login' >
            <button className="button2">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
