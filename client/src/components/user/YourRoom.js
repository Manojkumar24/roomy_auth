import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class YourRoom extends Component {
    state = {
        room: []
    }
    componentDidMount() {
        axios.get("/api/rooms/userRoom/")
            .then(res => {
                this.setState({
                    room: res.data
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