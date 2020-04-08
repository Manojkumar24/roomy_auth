import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import SearchField from 'react-search-field';
import axios from 'axios';

class Navbar extends Component{

  state = {
    user: null,
  }



  render(){
    const { auth: { isAuthenticated, loading }, logout} = this.props;
    // console.log(isAuthenticated,loading);
    if(isAuthenticated){
      axios.get('/api/profile/me').then(res => {
        this.setState({
          user: res.data
        })
        console.log(res.data)

      });
    }
  // console.log('ddsddssddsdsdssd',this.state.user);

  const authLinks = this.state.user ? (
    <ul id="nav-mobile" class="right">
      <li>
        <Link to="/details/1" >Create Room</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>logout</span>
        </a>
      </li>
    </ul>
  ) : (
    <ul id="nav-mobile" class="right">
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id="nav-mobile" class="right">>
      {/* <li>
        <a href='#!'> Profile</a>
      </li> */}
      <li>
        <Link to='/register'> Register</Link>
      </li>

      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav>
        <div class="nav-wrapper">
        <Link to="/" class="brand-logo">Logo</Link>
        {/* <div style={{ width:;}}>
          <input id="search" type="search"/>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div> */}
        <span className="center"><SearchField placeholder='Search for rooms...' /></span>
        
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
  };
};

Navbar.propTypes = {
  layout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
