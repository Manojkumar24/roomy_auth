import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import RoomCard from '../rooms/roomCard2';
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
  let form_data = {}
  console.log(this.state.pincode,this.state.pincode.length);
  
    if (this.state.pincode && (this.state.pincode > 999999 || this.state.pincode < 111111)){
      window.alert('Enter a valid pincode of 6 digits!')
    }
    
    else{
      if (this.state.pincode) {
        form_data.pincode = this.state.pincode;
      }
    }
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

  console.log("form data is ",form_data);    

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
      console.log(res.data)
      if (res.data.preferences){
        console.log(res.data.preferences.pincode)
        this.setState({
          rooms:res.data.rooms,
          isNonSmoker: (res.data.preferences.smoker && res.data.preferences.smoker == "No") ? true : false,
          isNightOwl: (res.data.preferences.nightowl && res.data.preferences.nightowl == "Yes") ? true : false,
          isEarlyBird: (res.data.preferences.earlybird && res.data.preferences.earlybird == "Yes") ? true : false,
          gender: (res.data.preferences.gender) ? res.data.preferences.gender : null,
          minPrice: (res.data.preferences.rent) ? res.data.preferences.rent : 0,
          maxPrice: 50000,
          pincode: (res.data.preferences.pincode) ? res.data.preferences.pincode : null,
          city: (res.data.preferences.city) ? res.data.preferences.city: null,
          pets: (res.data.preferences.pets) ? res.data.preferences.pets : null,
          vegetarians: (res.data.preferences.vegetarians && res.data.preferences.vegetarians == "Yes") ? true : false,
          furnished: (res.data.preferences.furnished) ? res.data.preferences.furnished : null,
          wifi: (res.data.preferences.wifi && res.data.preferences.wifi == "Yes") ? true : false,
          parking: (res.data.preferences.parking) ? res.data.preferences.parking : null

        })
      }
      else{
        this.setState({
          rooms: res.data
        })  
      }
      console.log(this.state)
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
            <div class="room-list">
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
            <div style={{width:"45%",backgroundColor:"green"}}>
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
        <div class="containerOne">
      { data }
        {/* <div style={{width:"45%",backgroundColor:"green"}}>hi</div>
        <div style={{width:"45%",backgroundColor:"red"}}>hi</div> */}
      </div>
        { user? ( user.isOwner)? <a></a> :
        <div class="filter">
        <form onSubmit={this.handleSubmit}>
        <div class="submit">
          
        </div>

        <div class="address">
        
                Pincode
       <input class="input" type="number" value = {this.state.pincode} onChange={this.handleChange} name="pincode" placeholder="PINCODE"/>

          
          <div class="city">
                  City
       <input class="input" type="text" value={this.state.city} onChange={this.handleChange} name="city" placeholder="city"/>

          </div>
          </div>
          <hr></hr>
        <div className='slider-horizontal'>


            <div>Price Range</div>
            <Slider
              min={0}
              max={this.state.maxPrice}
              value={this.state.minPrice}
              orientation='horizontal'
              onChange={this.handleChangeprice}
            />
            <p class="price">  Max price: Rs :{this.state.minPrice}</p>
            
          </div>

              <div class="option">
                <Switch onColor="#86d3ff"
                  value = {this.state.isEarlyBird}
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
                  value={this.state.isNightOwl}
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
          value={this.state.isNonSmoker}
    onHandleColor="#2693e6" handleDiameter={25}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    height={20} width={50} onChange={this.handleChangesmoke} checked={this.state.isNonSmoker} />
          < i className="fas fa-smoking-ban checked"></i> 
       
        <span class="span">No Smoking</span></div>

        <div class="option">
        <Switch onColor="#86d3ff" handleDiameter={25}
                  value={this.state.vegetarians}
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
        value = {this.state.wifi}
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
                  <input class="with-gap" type="radio" value="Four Wheeler" name="parking" checked={"Four Wheeler" === this.state.parking}/>
                <span>Four Wheeler</span>
            </label>
            <label>
                  <input class="with-gap" type="radio" value="Two Wheeler" name="parking" checked={"Two Wheeler" === this.state.parking}/>
                <span>Two Wheeler</span>
            </label>
            <label>
                  <input class="with-gap" type="radio" value="Both" name="parking" checked={"Both" === this.state.parking}/>
                <span>Both</span>
            </label>
            <label>
                  <input class="with-gap" type="radio" value="No parking" name="parking" checked={"No parking" === this.state.parking}/>
                <span>No parking</span>
            </label>
        </div>


              <div class="option" class="furnished" onChange={this.handleChange.bind(this)}>
                Furnished<br></br>
                <label>
                  <input class="with-gap" type="radio" value="Fully" name="furnished" checked={"Fully" === this.state.furnished}/>
                  <span>Fully</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Semi" name="furnished" checked={"Semi" === this.state.furnished}/>
                  <span>Semi</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Not Furnished" name="furnished" checked={"Not furnished" === this.state.furnished}/>
                  <span>Not Furnished</span>
                </label>
              </div>


              <div class="option" class="gender" onChange={this.handleChange.bind(this)}>
                Gender<br></br>
                <label>
                  <input class="with-gap" type="radio" value="Male" name="gender" checked={"Male" === this.state.gender}/>
                  <span>Male</span>
                </label>
                <label>
                  <input class="with-gap" type="radio" value="Female" name="gender" checked={"Female" === this.state.gender}/>
                  <span>Female</span>
                </label>
              </div>



                      <div  onChange={this.handleChange.bind(this)}>
                          Pets<br></br> 
                          <label>
                  <input class="with-gap" type="radio" value="Dogs" name="pets" checked={"Dogs" === this.state.pets}/>
                              <span>Dogs</span>
                          </label>
                          <label>
                  <input class="with-gap" type="radio" value="Cats" name="pets" checked={"Cats" === this.state.pets}/>
                              <span>Cats</span>
                          </label>
                          <label>
                  <input class="with-gap" type="radio" value="Birds" name="pets" checked={"Birds" === this.state.pets}/>
                              <span>Birds</span>
                          </label>
                          <label>
                  <input class="with-gap" type="radio" value="Others" name="pets" checked={"Others" === this.state.pets}/>
                            <span>Others</span>
                          </label>
                          <label>
                  <input class="with-gap" type="radio" value="No Pets" name="pets" checked={"No Pets" === this.state.pets}/>
                              <span>No Pets</span>
                          </label>
                          <label>
                  <input class="with-gap" type="radio" value="Not sure" name="pets" checked={"Not sure" === this.state.pets}/>
                              <span>Not sure</span>
                          </label>
                      </div>

                        <div class="submit">
                <button class="button button1" type="submit">Apply & Save Preferences </button> 
        </div>
         </form>
        </div> :<span></span> }
      
      
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
