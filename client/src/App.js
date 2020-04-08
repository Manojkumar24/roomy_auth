import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Login_Cust from './components/auth/Login_Cust';
import For_pass from './components/auth/for_pass';
import Mail_fg from './components/auth/mail_fg';
import Register from './components/auth/Register';
import Register_Cust from './components/auth/Register_Cust';
import Alert from './components/layout/Alert';
import Posts from './components/Posts/Posts';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

import Home from './components/owner/Home'
import PostRoomOne from './components/owner/PostRoomOne'
import PostRoomTwo from './components/owner/PostRoomTwo'
import PostRoomThree from './components/owner/PostRoomThree'

// import Register_Cust from './components/auth/Register_Cust';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/details/1" component={PostRoomOne} />
              <Route exact path="/details/2" component={PostRoomTwo} />
              <Route exact path="/details/3" component={PostRoomThree} />

              <Route exact path='/register' component={Register} />
              <Route exact path='/register_cust' component={Register_Cust} />
              
              <Route exact path='/login' component={Login} />
              <Route exact path='/login_cust' component={Login_Cust} />
              
              <Route exact path='/forgotpassword' component={For_pass} />
              <Route exact path='/fg_mail' component={Mail_fg} />
              
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/empty' component={Dashboard} />
              <PrivateRoute exact path='/posts' component={Posts} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;