import React, { Component, Fragment } from "react";
import axios from "axios";

class OwnerRoom extends Component {
    state = {
        room: [],
        interested:false
    }
    componentDidMount() {
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        console.log("/api/rooms/userviewRoom/" + id)
        axios.get("/api/rooms/userviewRoom/" + id)
            .then(res => {
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people != []) {
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            })
    }

    markInterested = (event) => {
        // event.preventDefault()
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        axios.get("/api/rooms/markInterested/" + id).then(
            res=>{
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people!=[]){
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            }
        )
    }

    markUnInterested = (event) => {
        // event.preventDefault()
        let id = this.props.match.params.room_id;
        let user = localStorage.getItem("user_name")
        axios.get("/api/rooms/markUnInterested/" + id).then(
            res => {
                this.setState({
                    room: res.data
                })
                if (res.data.interested_people != []) {
                    res.data.interested_people.map(person => {
                        if (person.name === user) {
                            this.setState({
                                interested: true
                            })
                        }
                    })
                }
            }
        )
    }

    render() {
        return (
            <div>
                <h3 className="center">Room</h3>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                {this.state.interested ? (
                    <form onSubmit={this.markUnInterested}>
                        <input type='submit' className='btn btn-primary' value='Mark as Uninterested' />
                    </form>
                ): (
                    <form onSubmit={this.markInterested}>
                        <input type='submit' className='btn btn-primary' value='Mark as Interested' />
                    </form>
                )}
            </div>
        )
    }
}

export default OwnerRoom