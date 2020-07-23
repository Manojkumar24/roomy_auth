import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

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
            <div>
                <h3>Post a room</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div onChange={this.handleChange.bind(this)}>
                            <label>Smoker <br></br> </label>
                                <label>
                                    <input class= "with-gap" type="radio" value="Yes" name="smoker"/>
                                    <span>Yes</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No" name="smoker" />
                                    <span>No</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Not sure" name="smoker"/>
                                    <span>Not sure</span>
                                </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Early Bird<br></br></label>
                                <label>    
                                    <input class="with-gap" type="radio" value="Yes" name="earlybird"/>
                                    <span>Yes</span> 
                            </label>
                            <label>
                                    <input class="with-gap" type="radio" value="No" name="earlybird"/>
                                    <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="earlybird" />
                                <span>Not sure</span>
                            </label>
                            
                        </div>
                        
                        <div onChange={this.handleChange.bind(this)}>
                            <label>Night Owl<br></br> </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Yes" name="nightowl"/>
                                    <span>Yes</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No" name="nightowl"/>
                                    <span>No</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Not sure" name="nightowl"/>
                                    <span>Not sure</span>
                                </label>
                        </div>
                        
                        <div onChange={this.handleChange.bind(this)}>
                            <label>Pets <br></br></label>
                                <label>
                                    <input class="with-gap" type="radio" value="Dogs" name="pets"/>
                                    <span>Dogs</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Cats" name="pets"/>
                                    <span>Cats</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Birds" name="pets" />
                                    <span>Birds</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Others" name="pets"/>
                                    <span>Others</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No Pets" name="pets"/>
                                    <span>No Pets</span>
                                </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="pets" />
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Vegetarian<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="vegetarians" />
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="vegetarians" />
                                <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="vegetarians" />
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Furnished<br></br> </label>
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

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Wifi<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="wifi" />
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="wifi" />
                                <span>No</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Parking<br></br> </label>
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

                {/* {console.log(this.state)} */}
                
            </div>
        );
    }
}

export default PostRoomThree;

