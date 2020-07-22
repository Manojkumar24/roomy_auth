import axios from 'axios';
import { setAlert } from './alert';
// import { browserHistory } from 'react-router'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  FG_SUCCESS,
  PW_SUCCESS,
  MAIL_SUCCESS,
  LOGIN_FAIL,
  FG_FAIL,
  PW_FAIL,
  MAIL_FAIL,
  CLEAR_PROFILE,
  LOGOUT
} from './types';

import setAuthToken from '../utils/setAuthToken';
//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log("inside owner reg");
  const body = JSON.stringify({ name, email, password });

  try {
    // console.log("control reaches here 1");
    const res = await axios.post('/api/users', body, config);

    // console.log("control reaches here 2");
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // console.log("control reaches here 3");
    dispatch(loadUser());
    // console.log("control reaches here 4");
    // this.props.history.push('/login');

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Register as customer

export const register_cust = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // console.log("inside csutoemr reg")
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users_cust', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};


//Login User

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    // browserHistory.push('/login')

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// login for customer..
//Login User

export const login_cust = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};


//forgot password / clear profile
export const for_pass = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/fg', body, config);

    dispatch({
      type: FG_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FG_FAIL
    });
  }
};

// password change
export const pw_ch = (password, password2) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ password, password2 });

  try {
    const res = await axios.post('/api/profile/pw', body, config);

    dispatch({
      type: PW_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PW_FAIL
    });
  }
};

// Mail change
export const mail_ch = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/profile/mail', body, config);

    dispatch({
      type: MAIL_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: MAIL_FAIL
    });
  }
};



//mail_send for forgot password
export const mail_fg = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/mail_sender', body, config);

    dispatch({
      type: 'please wait.. email sent successfully...',
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: 'mail sending failed..'
    });
  }
};



//Logout  /Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
