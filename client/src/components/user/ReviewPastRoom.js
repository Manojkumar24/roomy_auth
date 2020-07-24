import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class ReviewPastRoom extends Component {
    state = {
        occupants: [],
        furnished: null,
        wifi: null,
        parking: null,
        owner: null,
        review_text: null
    }

    componentDidMount() {
        axios.get("/api/rooms/listPastRoomDetails").then(res=>{
            // console.log(res.data);
            if (res.data.occupants){
                this.setState({
                    occupants:res.data.occupants
                })
            }
            if (res.data.roomreview){
                if (res.data.roomreview.furnished) {
                    this.setState({
                        furnished : res.data.roomreview.furnished
                    })
                }
                if (res.data.roomreview.wifi) {
                    this.setState({
                        wifi : res.data.roomreview.wifi
                    })
                }
                if (res.data.roomreview.parking) {
                    this.setState({
                        parking : res.data.roomreview.parking
                    })
                }
                if (res.data.roomreview.owner_review) {
                    this.setState({
                        owner: res.data.roomreview.owner_review
                    })
                }
                if (res.data.roomreview.review_text) {
                    this.setState({
                        review_text : res.data.roomreview.review_text
                    })
                }

            }
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    reviewRoom = (event) => {
        // event.preventDefault()
        
        let form_data = {};

        if (this.state.furnished) {
            form_data.furnished = this.state.furnished
        }

        if (this.state.wifi) {
            form_data.wifi = this.state.wifi
        }

        if (this.state.parking) {
            form_data.parking = this.state.parking
        }

        if (this.state.owner) {
            form_data.owner = this.state.owner
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

        axios.post("/api/rooms/reviewRoom", JSON.stringify(form_data), config).then(response => {
            this.setState({
                room: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let roommate_data = (this.state.occupants) ? (
            this.state.occupants.map(person =>{
                return(
                    <div>
                        <p>{person.name}</p>
                        <Link to = {"/review/" + person.name}>Review this room mate</Link>
                    </div>
                )
            })
        ) : (
            <p> No room mates </p>
        )
        return (
            <div>
                Your Review
                <form onSubmit={this.reviewRoom}>
                    <label>Furnished</label>
                    <input type="text" name="furnished" placeholder="furnished" value={this.state.furnished} onChange={this.handleChange} />

                    <label>Wifi</label>
                    <input type="text" name="wifi" placeholder="wifi" value={this.state.wifi} onChange={this.handleChange} />

                    <label>Parking</label>
                    <input type="text" name="parking" placeholder="parking" value={this.state.parking} onChange={this.handleChange} />

                    <label>Owner</label>
                    <input type="text" name="owner" placeholder="owner" value={this.state.owner} onChange={this.handleChange} />

                    <label>Your Comments</label>
                    <input type="text" name="review_text" placeholder="write your comments" value={this.state.review_text} onChange={this.handleChange} />

                    <input type="submit" value="Submit" />
                </form>
                {roommate_data}
            </div>
        )
    }
}

export default ReviewPastRoom