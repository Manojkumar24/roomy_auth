import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class YourRoom extends Component {
    state = {
        room: [],
        paidRent:null,
        rent_pay_date:null
    }
    componentDidMount() {
        axios.get("/api/rooms/userRoom/")
            .then(res => {
                this.setState({
                    room: res.data.details,
                    paidRent: res.data.paidRent,
                    rent_pay_date: res.data.rent_pay_date
                })
            })
    }

    render() {
        let occupant_data = this.state.room.occupants ? (
            this.state.room.occupants.map(person => {
                return (
                    <ul>
                        <li>{person.name}</li>
                        <li>{person.email}</li>
                    </ul>
                )
            })
        ) : (
                <p>There are currently no occupants</p>
            )

        let data = this.state.room.name ? (
            <div>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                {this.state.paidRent ? (
                    <p>Rent Paid on {this.state.rent_pay_date}</p>
                ): (<Link to = '/payment'>Pay Rent</Link>)}
                
                <p>Occupants</p>
                {occupant_data}
                    <Link to='/yourComplains'>Your Complains </Link>
            </div>
        ) : (
            <h4>{this.state.room.msg}</h4>
        )
        return (
            <div>
                <h3 className="center">Room</h3>
                {data}
                <Link to='/reviewPastRoom'>Review Past Room</Link>
            </div>
        )
    }
}

export default YourRoom