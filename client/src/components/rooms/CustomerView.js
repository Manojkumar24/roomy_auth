import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './CustomerView.css'
import office_img from '../../images/office.jpg'
import profile from "../../reducers/profile";

class CustomerView extends Component {
    state = {
        room: [],
        interested: false,
        image_id: 23,
        images: [{
            image_id: 23, imageValue: "https://www.w3schools.com/w3images/bedroom.jpg"
            , image_num: 1
        }, {
            image_id: 32, imageValue: "https://www.w3schools.com/w3images/livingroom2.jpg"
            , image_num: 2
        }, {
            image_id: 44, imageValue: "https://www.w3schools.com/w3images/diningroom.jpg"
            , image_num: 3
        }, {
            image_id: 26, imageValue: "https://www.w3schools.com/w3images/bedroom.jpg"
            , image_num: 4
        }]
    }
    handleimages = (id) => {
        this.setState({ image_id: id })
    }
    componentDidMount() {
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        console.log("/api/rooms/userviewRoom/" + id)
        axios.get("/api/rooms/userviewRoom/" + id)
            .then(res => {
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people != []) {
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            })
    }

    markInterested = (event) => {
        // event.preventDefault()
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        console.log("Id is",id);
        axios.get("/api/rooms/markInterested/" + id).then(
            res => {
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people != []) {
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            }
        )
    }

    markUnInterested = (event) => {
        // event.preventDefault()
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        axios.get("/api/rooms/markUnInterested/" + id).then(
            res => {
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people != []) {
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            }
        )
    }

    render() {
        let room = this.state.room;
        var myimg;
        let images = this.state.images;

        let myimage = (this.state.images.length > 0) ? (this.state.images.map((img) => {
            if (img.image_id == this.state.image_id) {
                return (<div class="image"> <img style={{ width: "100%", height: "96%" }} src={img.imageValue} alt="Room Image" /> </div>
                )
            }

        }
        )) : <a>not matched</a>;

        let imageslist = (this.state.images.length > 0) ? this.state.images.map(img => {
            return (
                <div class="image1" > <img onClick={() => this.handleimages(img.image_id)} src={img.imageValue} alt="Room Image" /> </div>

            )
        }) : <div class="image1"> <img src={office_img} alt="Room Image" /> </div>;
        let occupant_data = (this.state.room.occupants && this.state.room.occupants.length > 0) ? (
            this.state.room.occupants.map(person => {
                return (
                    <Link to={'/viewUserReview/'+person.user}>
                    <div class="usercard">
                        <div class="user-name">
                            <button class="btn"><i class="fa fa-check-circle"></i> Rent Paid</button>
                            <button class="btn"> Due <span>&#8377; 10000</span></button>
                            <h5>{person.name}</h5>

                        </div>
                        <h6 style={{ fontStyle: "italic" }}>{person.profession ? (
                            <div>
                                <p>{person.profession}</p>
                            </div>
                        ): (
                            <div>
                                <p>No profession added </p>
                            </div>
                        )} </h6>
                        <h6> <i style={{ marginLeft: "30px", marginRight: "10px" }} class="fa fa-envelope" aria-hidden="true"></i>{person.email}</h6>
                        {person.hobbies ? (
                            <div>
                                <h6>Hobbies</h6>
                                <p class="hobbies">
                                    {person.hobbies.hobbies1}
                                </p>
                            </div>
                            ) : (
                            <div>
                                    <p>No hobbies added</p>
                            </div>
                        )}
                        
                        
                    </div>
                    </Link>
                )
            })
        ) : (
                <p>There are currently no occupants</p>
            )
        return (

            <div class="details">
                <div class="heading">{this.state.room.name} </div>
                {myimage}
                <div class="images">
                    {imageslist}
                    {/* <div class="image1"> <img src={office_img} alt="Room Image" /> </div>
                <div class="image1"> <img src={office_img} alt="Room Image" /> </div>
                <div class="image1"> <img src={office_img} alt="Room Image" /> </div>
                <div class="image1"> <img src={office_img} alt="Room Image" /> </div>
                <div class="image1"> <img src={office_img} alt="Room Image" /> </div> */}
                </div>


                <div class="card">
                    <div class="title">The Space</div>
                    <div class="itemDisplayDetailLines">
                        <div class="row">
                            <p><i class="fa fa-fw fa-male"></i> Max people: {room.availability}</p>
                        </div>
                        <div class="row"><span>&#8377;</span> &nbsp; Rent:  {room.rent} /Month</div>
                    </div>
                    <div class="itemDisplayDetailLines">
                        <div class="row"><i class="fa fa-object-ungroup" ></i>&nbsp;Room Area: {room.sq_ft} Sq.Ft </div>
                        <div class="row"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Location: {room.pincode} ,{room.city}</div>
                    </div>
                </div>

                <div class="card">
                    <div class="title ">Amenities &nbsp; </div>
                    <div class="amenties">


                        {/* <button type="button" class="exploreBtn">Apply 7 day-trail</button>  */}
                        {room.parking == "Four Wheeler" ? <div ><i class="fa fa-car" aria-hidden="true"></i>  Four Wheeler Parking</div> : <span></span>}
                        {room.parking == "Two Wheeler" ? <div><i class="fa fa-motorcycle" aria-hidden="true"></i>  Two Wheeler Parking </div> : <span></span>}
                        {room.parking == "Both" ? <div><i class="fa fa-car" aria-hidden="true"></i> Four Wheeler Parking </div> : <span></span>}
                        {room.parking == "Both" ? <div><i class="fa fa-motorcycle" aria-hidden="true"></i> Two Wheeler Parking</div> : <span></span>}
                        {room.parking == "No Parking" ? <div> <i class="fa fa-motorcycle" aria-hidden="true"></i>No Parking </div> : <span></span>} &nbsp;&nbsp;
                        {room.wifi == "Yes" ? <div><i class="fa fa-wifi" aria-hidden="true"></i> Wifi </div> : <span></span>}&nbsp;
                        {room.furnished == "Yes" ? <div><i class="fa fa-bed" aria-hidden="true"></i> Furnished  </div> : <span></span>}


                    </div>
                </div>


                <div class="card">
                    <div class="title">Regulations</div>

                </div>

                {occupant_data}

                {this.state.interested ? (
                    <form onSubmit={this.markUnInterested}>
                        <input type='submit' className='btn btn-primary' value='Mark as Uninterested' />
                    </form>
                ) : (
                        <form onSubmit={this.markInterested}>
                            <input type='submit' className='btn btn-primary' value='Mark as Interested' />
                        </form>
                    )}

                <Link to={"/viewRoomReview/" + this.props.match.params.room_id}>View Reviews</Link>
            </div>

            
        )
    }
}

export default CustomerView