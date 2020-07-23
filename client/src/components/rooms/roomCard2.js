import React, { Fragment } from 'react'
import office_img from '../../images/office.jpg'
import './roomcard.css';



const RoomCard = ({ room, owner }) => {
    return (
        

                <div class="itemDisplayWrapper  " style={{backgroundColor:"white"}}>
                   <div class="card-image">
                       <img src={office_img} style={{width:"100%"}} alt="Room Image" />
    <div class="card-title" style={{color:"black",backgroundColor:'white',opacity:0.7,  height:60,fontSize:20,alignContent:"center"
                   }} >{room.name}</div>
                    </div>
                   
              
                    <div class="itemDisplayDetailLines">
                    <div class="row ">
                        <i class="fa fa-object-ungroup" ></i> {room.sq_ft} Sq.Ft.
                    </div>
                    <div class="row ">
                                     
                      <span>&#8377;</span>  {room.rent} /Month
                    </div>
                    </div>
                    <div class="itemDisplayDetailLines">
                    <div class="row "><i class="fa fa-map-marker" aria-hidden="true"></i> {room.pincode} ,{room.city} </div>
                    <div class="row ">Amenities &nbsp;
                        {/* <button type="button" class="exploreBtn">Apply 7 day-trail</button>  */}
                        {room.parking == "Four Wheeler" ? <i class="fa fa-car" aria-hidden="true"></i>  : <span></span>}
                        {room.parking == "Two Wheeler"  ? <i class="fa fa-motorcycle" aria-hidden="true"></i>  : <span></span>}
                        {room.parking == "Both"  ? <i class="fa fa-car" aria-hidden="true"></i>   : <span></span>}
                        {room.parking == "Both"  ? <i class="fa fa-motorcycle" aria-hidden="true"></i>   : <span></span>}
                        {room.parking == "No Parking"  ? <i class="fa fa-motorcycle" aria-hidden="true"></i>  : <span></span>} &nbsp;&nbsp;
                        {room.wifi == "Yes"  ? <i class="fa fa-wifi" aria-hidden="true"></i>   : <span></span>}&nbsp;
                        {room.furnished == "Yes"  ? <i class="fa fa-bed" aria-hidden="true"></i>   : <span></span>}
                       
                    </div>    
                    </div>
                    <div class="itemDisplayDetailLines">
                    <div class="row "><i class="fa fa-user" aria-hidden="true"></i> by {owner}</div>
                    <div class="row ">
                        <button type="button" class="exploreBtn">View Room</button> 
                    </div>
                    </div>
                 </div>    
                
              
             )}
         
     export default RoomCard;         