import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostRoom.css'

class PostRoomThree extends Component{

    state = {
        smoker: '',
        earlybird:'',
        nightowl:'',
        pets: '',
        vegetarians : '',
        furnished : '',
        wifi : '',
        parking : '',
        gender: ''
    }

    handleChange = (event) => {
        this.setState({    
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        let Copystate = JSON.parse(JSON.stringify(this.state))

        let prev_form_data = JSON.parse(localStorage.getItem('form_data'))
        
        let form_data = {
            ...prev_form_data, ...Copystate
        }

        console.log(form_data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('/api/rooms/create',JSON.stringify(form_data),config).then(response =>{
            // console.log(response);
            this.props.history.push('/dashboard');
        
        }).catch(error => {
        console.log(error);
        })

        // localStorage.setItem('form_data', JSON.stringify(form_data))

        this.setState({
            state: Copystate
        });

        

    }
    render(){
        return(
            <div class="post-room">
                <h3>Post a room (Step3)</h3>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="myborder">
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Smoker <br></br> </span>
                                <label>
                                    <input class= "withgap" type="radio" value="Yes" name="smoker"/>
                                    <span class="span"> Yes</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="No" name="smoker" />
                                    <span class="span">No</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="Not sure" name="smoker"/>
                                    <span class="span">Not sure</span>
                                </label>
                        </div>
                       
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Early Bird<br></br></span>
                                <label>    
                                    <input class="withgap" type="radio" value="Yes" name="earlybird"/>
                                    <span class="span">Yes</span> 
                            </label>
                            <label>
                                    <input class="withgap" type="radio" value="No" name="earlybird"/>
                                    <span class="span">No</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="Not sure" name="earlybird" />
                                <span class="span">Not sure</span>
                            </label>
                            
                        </div>
                       
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Night Owl<br></br> </span>
                                <label>
                                    <input class="withgap" type="radio" value="Yes" name="nightowl"/>
                                    <span class="span">Yes</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="No" name="nightowl"/>
                                    <span class="span">No</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="Not sure" name="nightowl"/>
                                    <span class="span">Not sure</span>
                                </label>
                        </div>
                       
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Pets <br></br></span>
                                <label>
                                    <input class="withgap" type="radio" value="Dogs" name="pets"/>
                                    <span class="span">Dogs</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="Cats" name="pets"/>
                                    <span class="span">Cats</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="Birds" name="pets" />
                                    <span class="span">Birds</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="Others" name="pets"/>
                                    <span class="span">Others</span>
                                </label>
                                <label>
                                    <input class="withgap" type="radio" value="No Pets" name="pets"/>
                                    <span class="span">No Pets</span>
                                </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="pets" />
                                <span class="span">Not sure</span>
                            </label>
                        </div>
                      
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Vegetarian<br></br> </span>
                            <label>
                                <input class="withgap" type="radio" value="Yes" name="vegetarians" />
                                <span class="span"> Yes&nbsp;</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="No" name="vegetarians" />
                                <span class="span"> No</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="Not sure" name="vegetarians" />
                                <span class="span">Not sure</span>
                            </label>
                        </div>
                       
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Furnished<br></br> </span>
                            <label>
                                <input class="withgap" type="radio" value="Fully" name="furnished" />
                                <span class="span">Fully</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="Semi" name="furnished" />
                                <span class="span">Semi</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="Not Furnished" name="furnished" />
                                <span >Not Furnished</span>
                            </label>
                        </div>
                      
                        <div onChange={this.handleChange.bind(this)}>
                            <span class="tag">Wifi<br></br> </span>
                            <label>
                                <input class="withgap" type="radio" value="Yes" name="wifi" />
                                <span  class="span">Yes</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="No" name="wifi" />
                                <span  class="span">No</span>
                            </label>
                        </div>
                      
                        <div onChange={this.handleChange.bind(this)}>
                            <span>Parking<br></br> </span>
                            <label>
                                <input class="withgap" type="radio" value="Four Wheeler" name="parking" />
                                <span>Four Wheeler</span>
                            </label>
                            <label>
                                <input class="withgap" type="radio" value="Two Wheeler" name="parking" />
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

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Preferred Gender<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Male" name="gender" />
                                <span>Male</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Female" name="gender" />
                                <span>Female</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="gender" />
                                <span>Not sure</span>
                            </label>
                        </div>


                        <button style={{ margin: "10px"}} type="submit" className="waves-effect waves-light btn-large" >Submit</button>
                        <Link to="/details/2"><button style={{ margin: "10px" }} className="waves-effect waves-light btn-large" >Previous</button></Link>

                    </div>
                </form>
                </div>
                     
                {/* {console.log(this.state)} */}
                
            </div>
        );
    }
}

export default PostRoomThree;

