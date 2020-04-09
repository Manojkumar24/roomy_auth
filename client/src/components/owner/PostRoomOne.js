import React, {Component} from 'react';
import { Link } from 'react-router-dom';


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
        console.log(this.state);
        if(this.state.phonenum.length !== 10) {
            window.alert('Enter a valid phone number of 10 digits!')
        }

        if (this.state.pincode.length !== 6) {
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
            <div>
                <h3>Post a room</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name of the house</label>
                        <input type="text" name="name" placeholder="House Name" required = {true} onChange = {this.handleChange}/>

                        <label>Square Feet</label>
                        <input type="number" name="sq_ft" placeholder="Square Feet" required={true} onChange={this.handleChange} />

                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address"  required = {true} onChange = {this.handleChange}/>

                        <label>City</label>
                        <input type="text" name="city" placeholder="City" required = {true} onChange = {this.handleChange}/>

                        <label>State</label>
                        <input type="text" name="state" placeholder="State" required={true} onChange={this.handleChange} />
                        
                        <label>Pin Code</label>
                        <input type="number" name="pincode" placeholder="Pin Code" required={true} onChange={this.handleChange} />

                        <label>Contact Number</label>
                        <input type="number" name="phonenum" placeholder="Contact Number" required = {true} onChange = {this.handleChange}/>

                        <button type="submit" style={{ margin: "10px" }} className="waves-effect waves-light btn-large" >Next</button>
    
                    </div>
                </form>

                {/* {console.log(this.state)} */}
                
            </div>
        );
    }
}

export default PostRoomOne;

