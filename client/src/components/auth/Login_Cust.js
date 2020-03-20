import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login_cust } from '../../actions/auth';
import "./login_cust.css"

const Login_Cust = ({ login_cust, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login_cust(email, password);
  };

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      
      
      <h1 className='large text-primary'>Customer Sign In</h1>
      <div className='myborder'>
          <div className="subhead">
          <p className='lead'>
            <i className='fas fa-user'></i> Log Into Your Account
          </p>
          </div>
          <div>  </div>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Customer Login' />
          </form>
          
          <p className='my-1'>
            Donot have an account? <Link to='/register_cust'>Sign Up</Link>
          </p>
          </div> 
          <p className='my-2'>
          <Link to='/fg_mail'>Forgot your password? </Link>
          </p>


    </Fragment>
  );
};

Login_Cust.propTypes = {
  login_cust: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login_cust }
)(Login_Cust);
