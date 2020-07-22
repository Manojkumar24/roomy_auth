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
                this.setState({
                    room: res.data
                })
                // console.log(res.data);
            })
    }

    AddUser = (event) => {
        // event.preventDefault()
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

    RemoveUser = (event) => {
        // event.preventDefault()
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

        let occupant_data = (this.state.room.occupants && this.state.room.occupants.length > 0) ? (
            this.state.room.occupants.map(person => {
                return (
                    <form onSubmit={this.RemoveUser}>
                        <ul>
                            <li><input type="text" name="name" readonly="readonly" value={person.name} /></li>
                            <li><input type="text" name="email" readonly="readonly" value={person.email} /></li>
                            <li><input type="submit" value="Remove" /></li>
                        </ul>
                    </form>
                )
            })
        ) : (
                <p>There are currently no occupants</p>
            )

        let intersted_data = (this.state.room.interested_people && this.state.room.interested_people.length > 0)? (
            this.state.room.interested_people.map(person=>{
                return (
                    <form onSubmit={this.AddUser}>
                        <ul>
                            <li><input type="text" name="name" readonly="readonly" value={person.name}/></li>
                            <li><input type="text" name="email" readonly="readonly" value={person.email}/></li>
                            <li><input type="submit" value = "Add"/></li>
                        </ul>
                    </form>
                )
            })
        ): (
            <p>None are Interested</p>
        )
        return(
            <div>
                <h3 className="center">Your Room</h3>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                <p>Occupants</p>
                {occupant_data}
                <p>Interested People</p>
                {intersted_data}
                {/* <ol>
                    {this.state.room.interested_people.map(item => <li>{item.name}</li>)}
                </ol> */}
                {/* <p>
                    <ul>
                        {this.state.room.interested_people.map(item =>{
                            return <li>{item["name"]} </li>
                        })}
                    </ul>
                </p> */}
            </div>
        )
    }
}

export default OwnerRoom