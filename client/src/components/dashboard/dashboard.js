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
    gender : null,
    minPrice : 0,
    maxPrice : 50000,
    pincode:null,
    city:null,
    pets: null,
    vegetarians : false,
    furnished : null,
    wifi : false,
    parking : null
  }
  handleChange = (event) => {
    this.setState({    
        [event.target.name] : event.target.value
    })

}

handleSubmit =(event)=>{
  // event.preventDefault()
  // console.log("Early Bird",this.state.isEarlyBird);
  // console.log("Non Smoker",this.state.isNonSmoker);
  // console.log("Night Owl",this.state.isNightOwl);
  // console.log("gender",this.state.gender); 
  // console.log("min price",this.state.minPrice);
  // console.log("max price",this.state.maxPrice)
  // console.log("pincode",this.state.pincode);
  // console.log("city",this.state.city); 
  // console.log("pets",this.state.pets); 
  // console.log("vegetarians",this.state.vegetarians);
  // console.log("furnished",this.state.furnished);
  // console.log("wifi",this.state.wifi);
  // console.log("parking",this.state.parking);
  
  // "rent": { "$lte": 500.5, "$gte": 500.5 }
  // "rent": [500.5, 2000]
  let form_data = {}

  if (this.state.pincode && this.state.pincode.length !== 6) {
    window.alert('Enter a valid pincode of 6 digits!')
  }

  else{      
        if(this.state.isEarlyBird){
          form_data.earlybird = "Yes";
        }
        else{
          form_data.earlybird = "No";
        }

        if (this.state.isNonSmoker) {
          form_data.smoker = "No";
        }else {
          form_data.smoker = "Yes";
        }

        if (this.state.isNightOwl) {
          form_data.nightowl = "Yes";
        }else {
          form_data.nightowl = "No";
        }

        if (this.state.gender) {
          form_data.gender =  this.state.gender;
        } 

        if (this.state.minPrice>0){
          form_data.rent = this.state.minPrice;
        }
        
        if (this.state.pincode) {
            form_data.pincode = this.state.pincode;
        }

        if(this.state.city){
          form_data.city = this.state.city;
        }

      if (this.state.pets) {
        form_data.pets = this.state.pets;
      }

      if (this.state.vegetarians) {
        form_data.vegetarians = "Yes";
      }else{
        form_data.vegetarians = "No";
      }

      if (this.state.furnished) {
        form_data.furnished = this.state.furnished;
      }

      if (this.state.wifi) {
        form_data.wifi = "Yes";
      }else{
        form_data.wifi = "No";
      }

      if (this.state.parking) {
        form_data.parking = this.state.parking;
      }

    console.log(form_data);

    }
    

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios.post('/api/rooms/filters', JSON.stringify(form_data), config).then(response => {
    console.log(response);
    // this.setState({
    //   rooms: response.data
    // })

  }).catch(error => {
    console.log(error);
  })
  
}

handleChangeprice = (value) => {
  this.setState({
    minPrice : value
  })
}

  handleChangeNightOwl = (value) => {
    this.setState({
      isNightOwl: value
    })
  }

  handleChangeEarlyBird = (value) => {
    this.setState({
      isEarlyBird: value
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
    if(user){
    localStorage.setItem("user_name",user.name)
    }
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
          
        </div>

        <div class="address">
        
                Pincode
       <input class="input" type="number" onChange={this.handleChange} name="pincode" placeholder="PINCODE"/>

          
          <div class="city">
                  City
       <input class="input" type="text" onChange={this.handleChange} name="city" placeholder="city"/>

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
                  height={20} width={50} onChange={this.handleChangeEarlyBird} checked={this.state.isEarlyBird} />
                {/* < i className="fas fa-smoking-ban checked"></i> */}

                <span class="span">Early Bird</span></div>


              <div class="option">
                <Switch onColor="#86d3ff"
                  onHandleColor="#2693e6" handleDiameter={25}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20} width={50} onChange={this.handleChangeNightOwl} checked={this.state.isNightOwl} />
                {/* < i className="fas fa-smoking-ban checked"></i> */}

                <span class="span">Night Owl</span></div>


         <div class="option">
         <Switch onColor="#86d3ff"
    onHandleColor="#2693e6" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    height={20} width={50} onChange={this.handleChangesmoke} checked={this.state.isNonSmoker} />
         {/* < i className="fas fa-smoking-ban checked"></i> */}
       
        <span class="span">No Smoking</span></div>

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


              <div class="option" class="furnished" onChange={this.handleChange.bind(this)}>
                Furnished<br></br>
                <label>
                  <input class="with-gap" type="radio" value="Fully" name="furnished" />
                  <span>Fully</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Semi" name="furnished" />
                  <span>Semi</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Not Furnished" name="furnished" />
                  <span>Not Furnished</span>
                </label>
              </div>


              <div class="option" class="gender" onChange={this.handleChange.bind(this)}>
                Gender<br></br>
                <label>
                  <input class="with-gap" type="radio" value="Male" name="gender" />
                  <span>Male</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Female" name="gender" />
                  <span>Female</span>
                </label>
              </div>



                      <div  onChange={this.handleChange.bind(this)}>
                          Pets<br></br> 
                          <label>
                              <input class="with-gap" type="radio" value="Dogs" name="pets" />
                              <span>Dogs</span>
                          </label>
                          <label>
                              <input class="with-gap" type="radio" value="Cats" name="pets" />
                              <span>Cats</span>
                          </label>
                          <label>
                              <input class="with-gap" type="radio" value="Birds" name="pets" />
                              <span>Birds</span>
                          </label>
                          <label>
                            <input class="with-gap" type="radio" value="Others" name="pets" />
                            <span>Others</span>
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
                <button class="button button1" type="submit">Apply & Save Preferences </button> 
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
