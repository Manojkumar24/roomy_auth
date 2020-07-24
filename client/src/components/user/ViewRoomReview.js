import React, { Component, Fragment } from "react";
import axios from "axios";

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
                    <div>
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
                <h5>No Reviews</h5>
            )
        return (
            <div>
                <h4>Reviews on {this.state.room.name}</h4>
                {reviews}
            </div>
        )
    }
}

export default ViewRoomReview