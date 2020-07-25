import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { mail_ch } from '../../actions/auth';
import './mail_ch.css';

const Mail_ch = ({ mail_ch, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
    
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
       
    mail_ch(email);
      
  };

  //Redirect if logged in

//   if (isAuthenticated) {
//     return <Redirect to='/login' />;
//   }

  return (
    <Fragment>
      <div class="review-room">
      <h1 className='large text-primary'>mail change</h1>
      <div className='myborder'>
          <div className="subhead">
          

          <p className='lead'>
            <i className='fas fa-user'></i>Please enter your new mail credientials
          </p>
       </div>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='New email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Confirm' />
      </form>
      </div>

      <p className='my-1'>
        
      </p>
      </div>
    </Fragment>
  );
};

Mail_ch.propTypes = {
  for_pass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { mail_ch }
)(Mail_ch);
