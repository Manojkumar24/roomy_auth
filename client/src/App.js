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
import Profile from './components/Profile/EditProfile';
import pw_ch from './components/Profile/pw_ch';
import mail_ch from './components/Profile/mail_ch';
import Payment from './components/payments/payments';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

import Home from './components/owner/Home'
import YourRoom from './components/user/YourRoom'
import YourComplains from './components/user/YourComplains'
import PostRoomOne from './components/owner/PostRoomOne'
import PostRoomTwo from './components/owner/PostRoomTwo'
import PostRoomThree from './components/owner/PostRoomThree'
import OwnerRoom from './components/rooms/OwnerRoom';
import CustomerView from './components/rooms/CustomerView';
import ViewComplains from './components/owner/ViewComplains';
import ReviewOccupant from './components/owner/ReviewOccupant';
import ReviewPastRoom from './components/user/ReviewPastRoom';
import ReviewRoomMate from './components/user/ReviewRoomMate';
import EditRoom from './components/owner/EditRoom';
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
          <section>
            <Alert />
            <Switch>
              
              <Route exact path="/home" component={Landing} />
              <Route exact path="/details/1" component={PostRoomOne} />
              <Route exact path="/details/2" component={PostRoomTwo} />
              <Route exact path="/details/3" component={PostRoomThree} />
              <Route exact path="/ownerroom/:room_id" component={OwnerRoom}/>
              <Route exact path="/userRoomView/:room_id" component={CustomerView} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/register_cust' component={Register_Cust} />
              <Route exact path='/yourRoom' component={YourRoom} />
              <Route exact path='/reviewPastRoom' component={ReviewPastRoom} />
              <Route exact path='/review/:name' component={ReviewRoomMate} />
              
              
              <Route exact path='/login' component={Login} />
              <Route exact path='/login_cust' component={Login_Cust} />
              <Route exact path='/yourComplains' component={YourComplains} />
              <Route exact path='/viewComplains/:room_id' component={ViewComplains} />
              <Route exact path='/removeUser/:email' component={ReviewOccupant} />
              <Route exact path='/editRoom/:room_id' component={EditRoom} />
              
              <Route exact path='/forgotpassword' component={For_pass} />
              <Route exact path='/fg_mail' component={Mail_fg} />
              <Route exact path='/pw_change' component={pw_ch} />
              <Route exact path='/mail_change' component={mail_ch} />
              <PrivateRoute exact path='/payment' component={Payment} />

              <PrivateRoute exact path='/profile' component={Profile} />
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
