import React, { Fragment } from 'react'
import office_img from '../../images/office.jpg'
import './roomcard.css';

const RoomCard = ({ room, owner }) => {
    return (
        <Fragment>

                <div class="itemDisplayWrapper col-lg-3  ">
                
                    <div class="itemDisplayImg">     
                    <div class="itemDisplayHeart">
                        <div class="pull-right"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                    </div>

                    <div class="itemDisplayPropName">
                        {room.name}
                    </div>
                    </div>
                
                    <div class="itemDisplayDetailLines">
                    <div class="col-lg-6 ">
                        <i class="fa fa-object-ungroup" aria-hidden="true"></i> {room.sqr_ft} Sq.Ft.
                    </div>
                    <div class="col-lg-6 ">
                        {/* <i class="fa fa-bed" aria-hidden="true"></i> x3  &nbsp; &nbsp; &nbsp;
                        <i class="fa fa-bath" aria-hidden="true"></i> x4  */}
                       <div class="col-lg-6 "><i class="fa fa-money" aria-hidden="true"></i> Rs.{room.rent}</div>
                    </div>
                    </div>
                    <div class="itemDisplayDetailLines">
                    <div class="col-lg-6 "><i class="fa fa-map-marker" aria-hidden="true"></i> {room.pincode} ,{room.city}</div>
                    <div class="col-lg-6 ">
                        <button type="button" class="exploreBtn">Apply 7 day-trail</button> 
                    </div>    
                    </div>
                    <div class="itemDisplayDetailLines">
                    <div class="col-lg-6 "><i class="fa fa-building-o" aria-hidden="true"></i> by  {owner}</div>
                    <div class="col-lg-6 ">
                        <button type="button" class="exploreBtn">Claim Room</button> 
                    </div>
                    </div>
                
                </div>
             </Fragment>)}
         
     export default RoomCard;         