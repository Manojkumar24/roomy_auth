import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import "./PostRoom.css"

class ReviewOccupant extends Component {
    state = {
        smoker: null,
        earlybird: null,
        nightowl: null,
        pets: null,
        vegetarians: null,
        review_text: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    RemoveUser = (event) => {
        event.preventDefault()
        // console.log(this.state);
        let email_id = this.props.match.params.email;
        let form_data = { "email": email_id };
        
        if(this.state.smoker){
            form_data.smoker = this.state.smoker
        }

        if (this.state.earlybird) {
            form_data.earlybird = this.state.earlybird
        }

        if (this.state.nightowl) {
            form_data.nightowl = this.state.nightowl
        }

        if (this.state.pets) {
            form_data.pets = this.state.pets
        }

        if (this.state.vegetarians) {
            form_data.vegetarians = this.state.vegetarians
        }

        if (this.state.review_text) {
            form_data.review_text = this.state.review_text
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log(form_data);

        axios.post("/api/rooms/removeUser", JSON.stringify(form_data), config).then(response => {
            this.setState({
                room: response.data
            })
        }).catch(error => {
            console.log(error);
        })
        
        this.props.history.goBack();
    }

    render() {
        return (
            <div class="post-room">
                <h3>Remove Occupant</h3>
                <div className='myborder'>
                <div class="subhead">
                    <p class='lead'>
                    <i className='fas fa-user'></i>Review Occupant
                    </p>
                </div>
                <form onSubmit = {this.RemoveUser}>
                    <span>Smoker</span>
                    <input type="text" name="smoker" placeholder="smoker" onChange={this.handleChange} />    

                    <span>Early Bird</span>
                    <input type="text" name="earlybird" placeholder="earlybird" onChange={this.handleChange} />    

                    <span>Night Owl</span>
                    <input type="text" name="nightowl" placeholder="nightowl" onChange={this.handleChange} />    

                    <span>Pets</span>
                    <input type="text" name="pets" placeholder="pets" onChange={this.handleChange} />    

                    <span>Vegetarians</span>
                    <input type="text" name="vegetarians" placeholder="vegetarians" onChange={this.handleChange} />    

                    <span>Your Comments</span>
                    <input type="text" name="review_text" placeholder="write your comments" onChange={this.handleChange} />    

                    <input type="submit" className="exploreButton1" value = "Submit and Remove User" />    
                </form>
            </div>
        </div>
        )
    }
}

export default withRouter(ReviewOccupant)