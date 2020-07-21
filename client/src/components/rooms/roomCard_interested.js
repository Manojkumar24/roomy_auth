import React, { Fragment } from 'react'
import office_img from '../../images/office.jpg'

const RoomCard = ({ room, owner }) => {
    console.log(room._id)
    return (
        <Fragment>
            <div className="col s10 m20">
                <div className="card">
                    <div className="card-image">
                        <img src={office_img} alt="Room Image" />
                        <span className="card-title">{room.name}</span>
                    </div>
                    <div className="card-content" style={{ color: "orange", fontSize: "20px" }}>
                        <p>Owner: {owner}</p>
                        <p>State: {room.state}</p>
                        <p>City: {room.city}</p>
                        <p>Pin Code: {room.pincode}</p>
                        <p><Link to='/login' className='btn btn-light'>
                            Interested
                        </Link></p>
                    </div>
                    <div className="card-action">
                        <p style={{ color: "orange", fontSize: "20px" }}>Rent ₹{room.rent} /month</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RoomCard;