import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class PostRoomThree extends Component{

    state = {
        smoking: '',
        EarlyBird:'',
        NightOwl:'',
        pets: ''
    }

    handleChange = (event) => {
        this.setState({    
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        
        let Copystate = JSON.parse(JSON.stringify(this.state))

        let prev_form_data = JSON.parse(localStorage.getItem('form_data'))
        
        let form_data = {
            ...prev_form_data, ...Copystate
        }

        console.log(form_data)

        localStorage.setItem('form_data', JSON.stringify(form_data))

        this.setState({
            smoking:Copystate.smoking,
            EarlyBird:Copystate.EarlyBird,
            NightOwl:Copystate.NightOwl,
            pets:Copystate.pets
        });

    }
    render(){
        return(
            <div>
                <h3>Post a room</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div onChange={this.handleChange.bind(this)}>
                            <label>Smoking <br></br> </label>
                                <label>
                                    <input class= "with-gap" type="radio" value="Yes" name="smoking"/>
                                    <span>Yes</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No" name="smoking" />
                                    <span>No</span>
                                </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Early Bird<br></br></label>
                                <label>    
                                    <input class="with-gap" type="radio" value="Yes" name="EarlyBird"/>
                                    <span>Yes</span> 
                            </label>
                            <label>
                                    <input class="with-gap" type="radio" value="No" name="EarlyBird"/>
                                    <span>No</span>
                            </label>
                            
                        </div>
                        
                        <div onChange={this.handleChange.bind(this)}>
                            <label>Night Owl<br></br> </label>
                                <label>
                                    <input class="with-gap" type="radio" value="Yes" name="NightOwl"/>
                                    <span>Yes</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No" name="NightOwl"/>
                                    <span>No</span>
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
                                    <input class="with-gap" type="radio" value="Others" name="pets"/>
                                    <span>Others</span>
                                </label>
                                <label>
                                    <input class="with-gap" type="radio" value="No Pets" name="pets"/>
                                    <span> No Pets</span>
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

