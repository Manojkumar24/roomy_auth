import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import RoomCard from '../rooms/roomCard';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import auth from '../../reducers/auth';
import Switch from "react-switch";
 import './dashboard.css';
 import Slider from 'react-rangeslider';
 import 'react-rangeslider/lib/index.css';


class dashboard extends Component {

  state = {
    rooms: [],
    isNonSmoker : false,
    isNightOwl : false,
    isEarlyBird : false,
    gender : '',
    distancefromPoint:100,
    minPrice : 50000,
    maxPrice : 50000,
    pincode:'',
    city:'',
    pets: 'Not sure',
    vegetarians : '',
    furnished : '',
    wifi : '',
    parking : ''
  }
  handleChange = (event) => {
    this.setState({    
        [event.target.name] : event.target.value
    })
}

handleSubmit =()=>{

}

handleChangeprice = (value) => {
  this.setState({
    minPrice : value
  })
}
handleChangesmoke = (value) => {
  this.setState({    
    isNonSmoker  : value
  })
}

handleChangeisveg = (value) => {
  this.setState({    
      vegetarians : value
  })
}

handleChangeisfurnished = (value) => {
  this.setState({    
      furnished : value
  })
}

handleChangeiswifi = (value) => {
  this.setState({    
      wifi : value
  })
}

handleSubmit(){

}

  componentDidMount(){
    axios.get('/api/rooms/list').then(res => {
      // console.log(res.data)
      this.setState({
        rooms: res.data
      })
     })
  }
  render(){
    let { auth: { user } }= this.props; 
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
          // console.log(this.state.rooms);
          
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
      <div class="dashboard">
        { user? ( user.isOwner)? <a></a> :
        <div class="filter">
        <form onSubmit={this.handleSubmit}>
        <div class="submit">
        <button class="button button1" type="submit">Apply filters </button>  
        </div>

        <div class="address">
        
        PINCODE
       <input class="input" type="number"  name="pincode" placeholder="PINCODE"/>

          
          <div class="city">
        City
       <input class="input" type="text"  name="city" placeholder="city"/>

          </div>
          </div>
        <div className='slider-horizontal'>


            <div>Price Range</div>
            <Slider
              
              min={0}
              max={this.state.maxPrice}
              value={this.state.minPrice}
              orientation='horizontal'
              onChange={this.handleChangeprice}
            />
            <p class="price">  Max price: RS:{this.state.minPrice}</p>
            
          </div>

         <div class="option">
         <Switch onColor="#86d3ff"
    onHandleColor="#2693e6" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    height={20} width={50} onChange={this.handleChangesmoke} checked={this.state.isNonSmoker} />
         < i  className="fas fa-smoking-ban checked"></i>
       
        <span class="span">No Smoking</span>
                
        
        
        </div>

        <div class="option">
        <Switch onColor="#86d3ff" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    onHandleColor="#2693e6" height={20} width={50} onChange={this.handleChangeisveg} className="react-switch" checked={this.state.vegetarians} />
        <i  className="fas fa-seedling checked"></i>
       
        <span class="span">Vegetarian</span> 
               
        
      
        </div>

        <div class="option">
        <Switch onColor="#86d3ff" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    onHandleColor="#2693e6" height={20} width={50} onChange={this.handleChangeisfurnished} checked={this.state.furnished} />
        <i  className="fas fa-bed checked"></i>
        
        <span class="span">furnished</span>
               
        
        
        </div>
        <div class="option">
        <Switch onColor="#86d3ff" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    onHandleColor="#2693e6" height={20} width={50} onChange={this.handleChangeiswifi} checked={this.state.wifi} />
        <i  className="fas fa-wifi checked"></i> 
        
        <span class="span">Wifi</span>
                
        
          
        </div>


        <div class="option" class="parking" onChange={this.handleChange.bind(this)}>
                            Parking<br></br> 
                            <label>
                                <input class="with-gap" type="radio" value="Four Wheeler" name="parking" />
                                <span>Four Wheeler</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Two Wheeler" name="parking" />
                                <span>Two Wheeler</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Both" name="parking" />
                                <span>Both</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No parking" name="parking" />
                                <span>No parking</span>
                            </label>
                        </div>


                        <div  onChange={this.handleChange.bind(this)}>
                            Pets<br></br> 
                            <label>
                                <input class="with-gap" type="radio" value="Dogs" name="pets" />
                                <span>Dogs</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Two Wheeler" name="pets" />
                                <span>Cats</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Both" name="pets" />
                                <span>Birds</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No Pets" name="pets" />
                                <span>No Pets</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="pets" />
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div class="submit">
        <button class="button button1" >Save Preferences </button>  
        </div>
         </form>
        </div> :<span></span> }
      
      <div className="container">
      { data }
      </div>
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
