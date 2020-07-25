  import React, { Fragment, useState } from 'react';
  import { Link, Redirect } from 'react-router-dom';
  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
  import { login } from '../../actions/auth';
  import "./login.css"

  const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
      e.preventDefault();
      login(email, password);
        // console.log("*****************************logged in");
      return <Redirect to='/dashboard' />;
    };

    //Redirect if logged in

    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Fragment>

      <div >
      <div class="bg-img"></div>
        <div class="login">
        
        <h1 className='large text-primary' style={{color:"white"}}>Sign In</h1>
        <div className='myborder'>
            <div className="subhead">
            <p className='lead'>
              <i className='fas fa-user'></i> Log Into Your Account
            </p>
            </div>
            <div>  </div>
            <form className='' onSubmit={e => onSubmit(e)}>
              <div className=''>
                <span>Email Address</span>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className=''>
              <span>Password</span>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  minLength='6'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <input style={{backgroundColor:"rgb(16, 77, 116)",color:"white",width:"150px",height:"40px"}} type='submit'  value='Login' />
            </form>
            
            <p className='my-1'>
              Donot have an account? <Link to='/register'>Sign Up</Link>
            </p>
            <p className='my-2'>
            <Link to='/fg_mail'>Forgot your password? </Link>
            </p>
            </div> 
           

            </div>
            </div>
      </Fragment>
    );
  };

  Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  export default connect(
    mapStateToProps,
    { login }
  )(Login);
