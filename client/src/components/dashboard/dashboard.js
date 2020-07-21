import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import RoomCard from '../rooms/roomCard';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import auth from '../../reducers/auth';

class dashboard extends Component {

  state = {
    rooms: []
  }

  componentDidMount(){
    axios.get('/api/rooms/list').then(res => {
      console.log(res.data)
      this.setState({
        rooms: res.data
      })
     })
  }
  render(){
    let { auth: { user } }= this.props; 
    console.log(this.props);
    localStorage.setItem("user_name",user.name)
    let data = user ? (
      user.isOwner ? (
        this.state.rooms.map(room =>{
          return (
            <div className="row">
              <Link to={'/ownerroom/'+room._id}>
                <RoomCard room={room} owner={user.name}/>
              </Link>
            </div>
          )
        })
      ) : (
        this.state.rooms.map(room => {
          console.log(this.state.rooms);
          
          return (
            <div className="row">
              <Link to={'/userRoomView/' + room._id}>
              <RoomCard room={room} owner={this.state.rooms.user} />
              </Link>
            </div>
          )
        })
      )
    ) : (<Redirect to='/dashboard' />)
    return (

      <div className="container">
      { data }
      </div>
    )
  }
}


dashboard.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  // profile: state.profile
});


export default connect(
  mapStateToProps,
)(dashboard);
