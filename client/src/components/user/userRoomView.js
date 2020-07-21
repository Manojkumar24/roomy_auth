import React, { Component, Fragment } from "react";
import axios from "axios";

class OwnerRoom extends Component {
    state = {
        room: []
    }
    componentDidMount() {
        let id = this.props.match.params.room_id;
        console.log("/api/rooms/ownerRoom/" + id)
        axios.get("/api/rooms/ownerRoom/" + id)
            .then(res => {
                this.setState({
                    room: res.data
                })
            })
    }
    render() {
        console.log(this.state)
        let data = this.state.room ? (
            this.state.room.map(room => {
                return (
                    <Fragment>
                        <h4>{room.name}</h4>
                        <p>Room rent {room.rent}</p>
                        <p>Availability {room.availability}</p>
                        <p>Interested</p>
                    </Fragment>
                )
            })
        ) : (
                <h4>Somting went wrong</h4>
            );
        //console.log(data)
        return (
            <div>
                <h3 className="center">Your Room</h3>
                {data}
            </div>
        )
    }
}

export default OwnerRoom