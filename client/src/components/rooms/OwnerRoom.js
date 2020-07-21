import React, { Component, Fragment } from "react";
import axios from "axios";

class OwnerRoom extends Component {
    state = {
        room: []
    }
    componentDidMount(){
        let id = this.props.match.params.room_id;
        console.log("/api/rooms/ownerRoom/" + id)
        axios.get("/api/rooms/ownerRoom/"+id)
            .then(res => {
                // console.log('****************8',res.data)
                this.setState({
                    room: res.data
                })
            })
    }
    render(){
        return(
            <div>
                <h3 className="center">Your Room</h3>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
            </div>
        )
    }
}

export default OwnerRoom