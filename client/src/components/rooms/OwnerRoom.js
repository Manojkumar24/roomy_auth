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

    HandleSubmit = (event) => {
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

    render(){
        let data = this.state.room.interested_people ? (
            this.state.room.interested_people.map(person=>{
                return (
                    <form onSubmit={this.HandleSubmit}>
                        <ul>
                            <li><input type="text" name="name" readonly="readonly" value={person.name}/></li>
                            <li><input type="text" name="email" readonly="readonly" value={person.email}/></li>
                            <li><input type="submit" value = "Add"/></li>
                        </ul>
                    </form>
                )
            })
        ): (
            <p>Noone is intrete</p>
        )
        return(
            <div>
                <h3 className="center">Your Room</h3>
                <h4>{this.state.room.name}</h4>
                <p>Room rent {this.state.room.rent}</p>
                <p>Availability {this.state.room.availability}</p>
                <p>Interested People</p>
                {data}
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