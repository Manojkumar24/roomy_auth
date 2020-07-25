import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import office_img from '../../images/office.jpg'
import "../rooms/CustomerView.css"
class YourRoom extends Component {
    state = {
        room: null,
        image_id:23,
        images:[{image_id:23,imageValue:"https://www.w3schools.com/w3images/bedroom.jpg"
        ,image_num:1},{image_id:32,imageValue:"https://www.w3schools.com/w3images/livingroom2.jpg"
        ,image_num:2},{image_id:44,imageValue:"https://www.w3schools.com/w3images/diningroom.jpg"
        ,image_num:3},{image_id:26,imageValue:"https://www.w3schools.com/w3images/bedroom.jpg"
        ,image_num:4}],
        paidRent:null,
        rent_pay_date:null
    }

    handleimages=(id)=>{
        this.setState({image_id:id})
        
    }
    componentDidMount() {

        axios.get("/api/rooms/userRoom/")
            .then(res => {
                console.log("room data is ",res.data.details);
                if(res.data.details){
                this.setState({
                    room: res.data.details,
                    paidRent: res.data.paidRent,
                    rent_pay_date: res.data.rent_pay_date
                })
            }
            })

        // console.log("room data is ", this.state.room);
          
    }

    render() {
        let room = this.state.room;
        let myimage = (this.state.images.length > 0)? (this.state.images.map((img)=>{
            if(img.image_id==this.state.image_id) {
            return(<div class="image"> <img  style={{width:"100%", height:"96%"}} src={img.imageValue} alt="Room Image" /> </div>
            )}
            
        }
            )):<a>not matched</a>;

        let imageslist = (this.state.images.length > 0)? this.state.images.map(img=>{
            return (
                <div class="image1" > <img onClick={()=>this.handleimages(img.image_id)} src={img.imageValue} alt="Room Image" /> </div>
                
            )
        }) : <div class="image1"> <img   src={office_img} alt="Room Image" /> </div> ;

        let occupant_data = (this.state.room && this.state.room.occupants) ? (
            this.state.room.occupants.map(person => {
                return (
                    <div className="usercard">
                        <div class="user-name">

                            <h5> <i style={{ marginLeft: "5px", marginRight: "10px" }} class="fa fa-user" aria-hidden="true"></i>{person.name}</h5>

                        </div>
                        <h6> <i style={{ marginLeft: "30px", marginRight: "10px" }} class="fa fa-envelope" aria-hidden="true"></i>{person.email}</h6>

                    </div>
                )
            })
        ) : (
                <p>There are currently no occupants</p>
            )
  
        let data = (this.state.room && this.state.room.name )? (
            <div>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                <p>Occupants</p>
                {occupant_data}
                    <Link to='/yourComplains'>Your Complains </Link>
            </div>
        ) : (
                <h4>Your are currently not associated with any room</h4>
        )

        console.log("before pringintg details",this.state.room);

        // let isPartofRoom = false;
        // if(this.state.room != []){
        //     isPartofRoom = true;
        // }

        let room_data = (this.state.room) ? (
                  
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
                        {room.parking == "Four Wheeler" ? <div ><i class="fa fa-car"  aria-hidden="true"></i>  Four Wheeler Parking</div> : <span></span>}
                        {room.parking == "Two Wheeler"  ?  <div><i class="fa fa-motorcycle" aria-hidden="true"></i>  Two Wheeler Parking </div>: <span></span>}
                        {room.parking == "Both"  ? <div><i class="fa fa-car" aria-hidden="true"></i> Four Wheeler Parking </div> : <span></span>}
                        {room.parking == "Both"  ? <div><i class="fa fa-motorcycle" aria-hidden="true"></i> Two Wheeler Parking</div>  : <span></span>}
                        {room.parking == "No Parking"  ?<div> <i class="fa fa-motorcycle" aria-hidden="true"></i>No Parking </div> : <span></span>} &nbsp;&nbsp;
                        {room.wifi == "Yes"  ? <div><i class="fa fa-wifi" aria-hidden="true"></i> Wifi </div> : <span></span>}&nbsp;
                        {room.furnished == "Yes"  ? <div><i class="fa fa-bed" aria-hidden="true"></i> Furnished  </div>: <span></span>}
                       
                       
                    </div>
                 </div>    

                 
                 <div class="card">
                <div class="title">Regulations</div>  
                    <Link to='/payment'><span className="exploreButton1">View Transaction History </span></Link>
                    <br /><br /><br />
                </div>
                <Link to='/yourComplains'><span className="exploreButton1">Your Complains </span></Link>
                {occupant_data}
                
            </div>

        ):(<div className="review-room" style={{padding:"5%"}}><div className="myborder"><h4>you don't have any booked room </h4></div></div>)
        return (
            <div>
                        {room_data}
                        <div style={{marginLeft:"10%",marginTop:"20%"}}>
                          {/* <a href="/reviewPastRoom">click here</a> */}
                          <Link to='/reviewPastRoom'><span className="exploreButton1">Review Past Room </span></Link>
                          </div>
            </div>
        )
    }
}

export default YourRoom