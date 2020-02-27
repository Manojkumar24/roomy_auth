import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { for_pass } from '../../actions/auth';
import './forgot_pass.css';

const For_pass = ({ for_pass, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    for_pass(email, password);
  };

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Forgot Password</h1>
      <div className='myborder'>
          <div className="subhead">
          

          <p className='lead'>
            <i className='fas fa-user'></i>Please enter your mail again
          </p>
       </div>
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
        <input type='submit' className='btn btn-primary' value='Confirm' />
      </form>
      </div>

      <p className='my-1'>
        
      </p>
      
    </Fragment>
  );
};

For_pass.propTypes = {
  for_pass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { for_pass }
)(For_pass);
