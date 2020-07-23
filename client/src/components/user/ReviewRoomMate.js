import React, { Component, Fragment } from "react";
import axios from "axios";

class ReviewRoomMate extends Component {
    state = {
        smoker: null,
        earlybird: null,
        nightowl: null,
        pets: null,
        vegetarians: null,
        review_text: null
    }

    componentDidMount(){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let name = this.props.match.params.name;
        axios.post("/api/rooms/reviewRoomMate/", JSON.stringify({"name":name}), config).then(res => {
            if (res.data.smoker) {
                this.setState({
                    smoker : res.data.smoker
                })
            }
            if (res.data.earlybird) {
                this.setState({
                    earlybird : res.data.earlybird
                })
            }
            if (res.data.nightowl) {
                this.setState({
                    nightowl : res.data.nightowl
                })
            }
            if (res.data.pets) {
                this.setState({
                    pets : res.data.pets
                })
            }
            if (res.data.vegetarians) {
                this.setState({
                    vegetarians : res.data.vegetarians
                })
            }

            if (res.data.review_text) {
                this.setState({
                    review_text : res.data.review_text
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitReview = (event) => {
        // event.preventDefault()
        let name = this.props.match.params.name;
        let form_data = { };

        if (this.state.smoker) {
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
        if(form_data!={}){
            form_data.name = name;
            axios.post("/api/rooms/submitUserReview", JSON.stringify(form_data), config).then(response => {           
                console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
        }

    }

    render() {
        return (
            <div>
                Your Review
                <form onSubmit={this.submitReview}>
                    <label>Smoker</label>
                    <input type="text" name="smoker" value={this.state.smoker} placeholder="smoker" onChange={this.handleChange} />

                    <label>Early Bird</label>
                    <input type="text" name="earlybird" value={this.state.earlybird} placeholder="earlybird" onChange={this.handleChange} />

                    <label>Night Owl</label>
                    <input type="text" name="nightowl" value={this.state.nightowl} placeholder="nightowl" onChange={this.handleChange} />

                    <label>Pets</label>
                    <input type="text" name="pets" value={this.state.pets} placeholder="pets" onChange={this.handleChange} />

                    <label>Vegetarians</label>
                    <input type="text" name="vegetarians" value={this.state.vegetarians} placeholder="vegetarians" onChange={this.handleChange} />

                    <label>Your Comments</label>
                    <input type="text" name="review_text" value={this.state.review_text} placeholder="write your comments" onChange={this.handleChange} />

                    <input type="submit" value="Submit Review" />
                </form>
            </div>
        )
    }
}

export default ReviewRoomMate