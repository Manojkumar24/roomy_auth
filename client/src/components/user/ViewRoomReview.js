import React, { Component, Fragment } from "react";
import axios from "axios";
import './Review.css';
class ViewRoomReview extends Component {
    state = {
        comments: [],
        room: []
    }

    componentDidMount() {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let id = this.props.match.params.room_id;
        axios.post("/api/rooms/viewRoomReview", JSON.stringify({ "id": id }), config).then(res => {
            if (res.data.comments) {
                this.setState({
                    comments: res.data.comments
                })
            }
            if (res.data.room) {
                this.setState({
                    room: res.data.room
                })
            }
            console.log("dmdkkdfmkdfkkj", this.state)
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let reviews = (this.state.comments && this.state.comments.length > 0) ? (
            this.state.comments.map(review => {
                return (
                    <div >
                        <ul>
                            <li>Rent:{review.rent}</li>
                            <li>furnished:{review.furnished}</li>
                            <li>wifi:{review.wifi}</li>
                            <li>parking:{review.parking}</li>
                            <li>review_text:{review.review_text}</li>
                            <li>owner_review:{review.owner_review}</li>

                            {/* <li>Revieved by:{review.user.name}</li> */}
                        </ul><br />
                    </div>
                )
            })
        ) : (
            <div>
                <h5>No Reviews</h5>
                </div>
            )
        return (
            <div  className="review-room">
                 <h3 style={{color:"rgb(16, 77, 116)"}}> Reviews on {this.state.room.name} </h3>
                 <div className='myborder'>
                    <div class="subhead">
                    <p class='lead'>
                    <i className='fa fa-comments-o'></i>Reviews
                 </p>
                 </div>
                {reviews}
                </div>
            </div>
        )
    }
}

export default ViewRoomReview