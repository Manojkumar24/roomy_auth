import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { pw_ch } from '../../actions/auth';
import './pw_ch.css';

const Pw_ch = ({ pw_ch, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
        setAlert('Passwords do not match', 'danger');
      } 

      else {
          pw_ch(password, password2);
          return <Redirect to='/dashboard' />;
          //this.props.history.push('/login');
      }
  };

  //Redirect if logged in

  // if (isAuthenticated) {
  //   return <Redirect to='/login' />;
  // }

  return (
    <Fragment>
      <h1 className='large text-primary'>Password Change</h1>
      <div className='myborder'>
          <div className="subhead">
          

          <p className='lead'>
            <i className='fas fa-user'></i>Please enter your password credientials
          </p>
       </div>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='New password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
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

Pw_ch.propTypes = {
  for_pass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { pw_ch }
)(Pw_ch);
