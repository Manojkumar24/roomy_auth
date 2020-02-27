import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mail_fg } from '../../actions/auth';
import "./forgot_pass.css";

const Mail_fg = ({ mail_fg, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    mail_fg(email);
  };

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Forgot password</h1>
      <div className='myborder'>
      <div className="subhead">
           <p className='lead'>
        
        <i className='fas fa-user'></i> please enter your mail
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
        {/* <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div> */}
        <input type='submit' className='btn btn-primary' value='Send' />
      </form>
      </div>
      <p className='my-1'>
        
      </p>
      {/* <p className='my-1'>
        Donot have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p className='my-2'>
        Forgot password? <Link to='/forgotpassword'>forgotpassword</Link>
      </p> */}
    </Fragment>
  );
};

Mail_fg.propTypes = {
  mail_fg: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { mail_fg }
)(Mail_fg);
