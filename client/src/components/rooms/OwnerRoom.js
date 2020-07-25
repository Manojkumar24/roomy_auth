import React, { Component, Fragment } from "react";
import axios from "axios";
import office_img from '../../images/office.jpg'
import { Link } from 'react-router-dom';

class OwnerRoom extends Component {
    state = {
        room: [],
        payments:[],
        image_id:23,
        images:[{image_id:23,imageValue:"https://www.w3schools.com/w3images/bedroom.jpg"
        ,image_num:1},{image_id:32,imageValue:"https://www.w3schools.com/w3images/livingroom2.jpg"
        ,image_num:2},{image_id:44,imageValue:"https://www.w3schools.com/w3images/diningroom.jpg"
        ,image_num:3},{image_id:26,imageValue:"https://www.w3schools.com/w3images/bedroom.jpg"
        ,image_num:4}]
    }

    handleimages=(id)=>{
        this.setState({image_id:id})
    }

    componentDidMount(){
        let id = this.props.match.params.room_id;
        console.log("/api/rooms/ownerRoom/" + id)
        axios.get("/api/rooms/ownerRoom/"+id)
            .then(res => {
                this.setState({
                    room: res.data.details,
                    payments:res.data.payments
                })
                // console.log(res.data);
            })
    }

    AddUser = (event) => {
        event.preventDefault()
        // console.log(event.target.email.value);
        let room_id = this.props.match.params.room_id;
        let email_id = event.target.email.value;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post("/api/rooms/addUser", JSON.stringify({"email":email_id,"room":room_id}), config).then(response => {
            this.setState({
                room: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }
     
    AddUser1 = (mail) => {
       // event.preventDefault()
        // console.log(event.target.email.value);
        let room_id = this.props.match.params.room_id;
        let email_id = mail;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post("/api/rooms/addUser", JSON.stringify({"email":email_id,"room":room_id}), config).then(response => {
            this.setState({
                room: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }
    RemoveUser = (event) => {
        event.preventDefault()
        // console.log(event.target.email.value);
        let room_id = this.props.match.params.room_id;
        let email_id = event.target.email.value;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post("/api/rooms/removeUser", JSON.stringify({ "email": email_id, "room": room_id }), config).then(response => {
            this.setState({
                room: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render(){
        let room =this.state.room;
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


        let tenents_data = (this.state.room.occupants && this.state.room.occupants.length > 0) ? (
            this.state.room.occupants.map(person => {
                return (  
                
                    <div class="usercard">
                    <div class="user-name">		 
                    <button class="btn"><i class="fa fa-check-circle" style={{color:"green"}}></i> Rent Paid</button> 
                    <button class="btn"> <i class="fa fa-exclamation" style={{color:"red"}}></i>  Due <span>&#8377; 10000</span></button>  
                    <h5>Abhiram Maddipudi</h5> 
                   
                      </div>
                   <h6 style={{fontStyle: "italic"}}> CSE Grad | software developer </h6>
                   <h6> <i style={{marginLeft:"30px",marginRight:"10px"}} class="fa fa-envelope"  aria-hidden="true"></i>abhiram@gmail.com</h6>
                   <h6>Hobbies</h6>
                   <p class="hobbies">
                       playing cricket ,badminton,watching animes
                   </p>
                 {  ( person.hobby.length > 0) ? (
            this.state.room.occupants.map(hobby => {
                return (<p class="hobbies">
                playing cricket ,badminton,watching animes  </p> )})) : <span>-</span>
                  }

                    </div>   

                    )})  ): <p>There are currently no occupants</p>
        let occupant_data = (this.state.room.occupants && this.state.room.occupants.length > 0) ? (
            this.state.room.occupants.map(person => {
                return (
                    <div>
                        <ul>
                            <li>{person.name}</li>
                            <li>{person.email}</li>
                            <Link to={'/removeUser/' + person.email}>Remove User</Link>
                        </ul>
                    </div>
                )
            })
        ) : (
                <p>There are currently no occupants</p>
            )

        let intersted_data = (this.state.room.interested_people && this.state.room.interested_people.length > 0)? (
            this.state.room.interested_people.map(person=>{
                return (

                    <div class="usercard">
                    <div class="user-name">		 
                    
                   <h5>{person.name}</h5> 
                   
                      </div>
                   <h6 style={{fontStyle: "italic"}}> CSE Grad | software developer </h6>
                   <h6> <i style={{marginLeft:"30px",marginRight:"10px"}} class="fa fa-envelope"  aria-hidden="true"></i>abhiram@gmail.com</h6>
                   <h6>Hobbies</h6>
                   <p class="hobbies">
                       playing cricket ,badminton, chess
                   </p>
                   {/* <div>
                   <button class="exploreButton" onClick={()=>this.AddUser1(person.email)} type="submit" value="Submit" >Add to Room
                   </button>                   </div>  */}
                   
                     <form onSubmit={this.AddUser}>
                         <ul>
                             <li><input type="text" name="name" readonly="readonly" hidden="true" value={person.name}/></li>
                             <li><input type="text" name="email" readonly="readonly" hidden="true" value={person.email}/></li>
                             <li><input type="submit" value = {person.email}/></li>
                         </ul>
                     </form>
                    </div>
                )
            })
        ): (
            <p>None are Interested</p>
        )
        
        let rentHistory = this.state.payments ? (
            this.state.payments.map(payment => {
                return (
                    <div>
                        <ul>
                            <li>Payment id: {payment.payment_id}</li>
                            <li>Order id:  {payment.order_id}</li>
                            <li>Transaction Date: {payment.transaction_date}</li>
                            <li>Payment Amount: {payment.amount}</li>
                            <li>Transaction Method: {payment.transaction_method}</li>
                        </ul> <br></br>
                    </div>
                )
            })
        ) : (
                <div>
                    <h3>No Transaction History</h3>
                </div>
            )

        return(
            <div>
                <div class="details">
                <div class="heading" >{this.state.room.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={'/editRoom/' + this.props.match.params.room_id}><span class="exploreButton">Edit Room</span></Link>
                </div> 
                
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
                     
                </div>

                {occupant_data}
        <div class="usercard">
         <div class="user-name">		 
         <button class="btn"><i class="fa fa-check-circle" style={{color:"green"}}></i> Rent Paid</button> 
         <button class="btn"> <i class="fa fa-exclamation" style={{color:"red"}}></i>  Due <span>&#8377; 10000</span></button>  
         <h5>Abhiram Maddipudi</h5> 
        
           </div>
		<h6 style={{fontStyle: "italic"}}> CSE Grad | software developer </h6>
        <h6> <i style={{marginLeft:"30px",marginRight:"10px"}} class="fa fa-envelope"  aria-hidden="true"></i>abhiram@gmail.com</h6>
		<h6>Hobbies</h6>
		<p class="hobbies">
			playing cricket ,badminton,watching animes
		</p>
	
	     </div>

               
            




                <h3 className="center">Your Room</h3>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                
                <Link to={'/viewComplains/' + this.props.match.params.room_id}><div class="exploreButton">Your Complains</div></Link>

              <p>Occupants</p>
                {occupant_data}
                <p>Interested People</p>
                {intersted_data}
                </div>  

                
                <p>Rent Details</p>
                {rentHistory}

            </div>
        )
    }
}

export default OwnerRoom