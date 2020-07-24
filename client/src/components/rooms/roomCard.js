import React, { Fragment } from 'react'
import office_img from '../../images/office.jpg'
import './roomcard.css';

const RoomCard = ({ room, owner }) => {
    return (
        <Fragment>
            
                <div className="card ">
                    <div class="card-image">
                        <img src={office_img} alt="Room Image" />
                        <span class="card-title" style={{color:"black"}} >{room.name}</span>
                    </div>
                    <div className="card-content" style={{ color: "orange", fontSize: "20px" }}>
                        <p>Owner: {owner}</p>
                        <p>State: {room.state}</p>
                        <p>City: {room.city}</p>
                        <p>Pin Code: {room.pincode}</p>
                    </div>
                    <div className="card-action">
                        <p style={{ color: "orange", fontSize: "20px" }}>Rent ₹{room.rent} /month</p>
                    </div>
                </div>
            
        </Fragment>
    )
}

export default RoomCard;