import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './PostRoom.css'
class PostRoomOne extends Component{

    state = {    
        name: null,
        address : null,
        sq_ft : null,
        phonenum: null,
        city : null,
        state : null,
        pincode : null
    
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // console.log(this.state);
        if(this.state.phonenum.length !== 10) {
            window.alert('Enter a valid phone number of 10 digits!')
        }

        else if (this.state.pincode.length !== 6) {
            window.alert('Enter a valid pincode of 6 digits!')
        }

        else {
            let Copystate = JSON.parse(JSON.stringify(this.state))
            Copystate.sq_ft = parseInt(this.state.sq_ft)    
            localStorage.setItem('form_data',JSON.stringify(Copystate))
            // console.log(JSON.parse(localStorage.getItem("form_data")))
            // console.log(Copystate);
            this.setState({ state: Copystate }, () => { this.props.history.push('/details/2') });
        
        }

    }
    render(){
        return(
            <div class="post-room">
                <h3>Post a room</h3>
                <div className='myborder'>
                <div class="subhead">
                    <p class='lead'>
                    <i className='fas fa-user'></i>Add Room Details
                    </p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                     <div class="section">
                        <div class="unit"> 
                        <i class="fa fa-home" aria-hidden="true"></i>&nbsp;<span>Name of the house</span>
                        <input type="text" name="name" placeholder="House Name" required = {true} onChange = {this.handleChange}/>
                        </div>
                        <div class="unit">
                        <i class="fa fa-object-ungroup" ></i>&nbsp;
                        <span>Square Feet</span>
                        <input type="number" name="sq_ft" placeholder="Square Feet" required={true} onChange={this.handleChange} />
                        </div>
                        
                     </div>
                        <span>Address</span>
                        <input type="text" name="address" placeholder="Address"  required = {true} onChange = {this.handleChange}/>
                        
                     <div class="section">
                       <div class="unit">
                        <span>City</span>
                        <input type="text" name="city" placeholder="City" required = {true} onChange = {this.handleChange}/>
                        </div>
                        <div class="unit">
                        <span>State</span>
                        <input type="text" name="state" placeholder="State" required={true} onChange={this.handleChange} />
                         </div>
                      </div>
                      <div class="section"> 
                       <div class="unit">
                        <span>Pin Code</span>
                        <input type="number" name="pincode" placeholder="Pin Code" required={true} onChange={this.handleChange} />
                       </div>
                       <div class="unit">
                       <i class="fa fa-address-book" aria-hidden="true"></i>&nbsp;
                        <span>Contact Number</span>
                        <input type="number" name="phonenum" placeholder="Contact Number" required = {true} onChange = {this.handleChange}/>
                        </div>
                      </div>
                        <button type="submit" style={{ margin: "10px" }} className="waves-effect waves-light btn-large" >Next</button>
    
                    </div>
                </form>

                {/* {console.log(this.state)} */}
                </div>
            </div>
        );
    }
}

export default PostRoomOne;

