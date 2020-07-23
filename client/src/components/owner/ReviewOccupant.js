import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from 'react-router-dom'

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
        console.log(this.props.history);
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
            <div>
                Your Review
                <form onSubmit = {this.RemoveUser}>
                    <label>Smoker</label>
                    <input type="text" name="smoker" placeholder="smoker" onChange={this.handleChange} />    

                    <label>Early Bird</label>
                    <input type="text" name="earlybird" placeholder="earlybird" onChange={this.handleChange} />    

                    <label>Night Owl</label>
                    <input type="text" name="nightowl" placeholder="nightowl" onChange={this.handleChange} />    

                    <label>Pets</label>
                    <input type="text" name="pets" placeholder="pets" onChange={this.handleChange} />    

                    <label>Vegetarians</label>
                    <input type="text" name="vegetarians" placeholder="vegetarians" onChange={this.handleChange} />    

                    <label>Your Comments</label>
                    <input type="text" name="review_text" placeholder="write your comments" onChange={this.handleChange} />    

                    <input type="submit" value = "Submit and Remove User" />    
                </form>
            </div>
        )
    }
}

export default withRouter(ReviewOccupant)