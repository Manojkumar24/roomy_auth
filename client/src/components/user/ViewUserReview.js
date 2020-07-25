import React, { Component, Fragment } from "react";
import axios from "axios";
import './Review.css'

class ViewUserReview extends Component {
    state = {
        comments:[],
        user:[]
    }

    componentDidMount(){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let id = this.props.match.params.id;
        axios.post("/api/rooms/viewUserReview", JSON.stringify({"id":id}), config).then(res => {
            if(res.data.comments){
                this.setState({
                    comments: res.data.comments
                })
            }
            if(res.data.user){
                this.setState({
                    user: res.data.user
                })
            }
            console.log("tte",this.state)
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let reviews = (this.state.comments && this.state.comments.length>0) ? (
            this.state.comments.map(review => {
                return(
                    <div className="usercard">
                        <ul>
                                <li>Smoker:{review.smoker}</li>
                
                                <li>EarlyBird:{review.earlybird}</li>
                            
            
                                <li>Night Owl:{review.nightowl}</li>
                            
                                <li>Pets:{review.pets}</li>
                            
                        
                                <li>Vegetarians:{review.vegetarians}</li>
                            

                        
                                <li>Review:{review.review_text}</li>
                            
                        {/* <li>Revieved by:{review.user.name}</li> */}
                        </ul><br/>
                    </div>
                )
            })
        ):(
            <h5>No Reviews</h5>
        ) 
        return (

            <div className="review-room">
                <h3 style={{ color: "rgb(16, 77, 116)" }}> Reviews on {this.state.user.name} </h3>
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

export default ViewUserReview