import React, { Component, Fragment } from "react";
import axios from "axios";
import "./PostRoom.css";

class ViewComplains extends Component {
    state = {
        complains: []
    }
    componentDidMount() {
        console.log("before id");
        let id = this.props.match.params.room_id;
        console.log(id);
        axios.get("/api/rooms/listOwnerComplain/"+id)
            .then(res => {
                console.log("result data",res.data);
                this.setState({
                    complains: res.data
                })
            })
    }

    handleSubmit = (event) => {
        let id = event.target.id.value;
        axios.get("/api/rooms/updateComplain/" + id)
            .then(res => {
                this.setState({
                    complains: res.data
                })
            })
    }

    render() {
        let complain_data = (this.state.complains && this.state.complains > 0) ? (
            this.state.complains.map(complain => {
                return (
                    <div className="usercard">
                    
        <div><i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-tag"  aria-hidden="true"></i>{complain.complain} </div>
                    <div style={{width:"60px",padding:"4px",color:"white",backgroundColor:"rgb(16, 77, 116)",borderRadius:"5px"}}>{complain.status} </div>
         <div><i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-user"  aria-hidden="true"></i>{complain.user.name}</div>
         <div><i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-envelope"  aria-hidden="true"></i>{complain.user.email}</div>
                        <div>{complain.created_at}</div>
                        <form onSubmit = {this.handleSubmit}>
                            <input type="text" name="id" value={complain._id} hidden/>
                            <input type='submit' className='exploreButton1' value='Mark as closed' />
                        </form>
                    
                    </div>
                )
            })
        ) : (
                <p>There are currently no complains</p>
            )

        return (
            <div className="post-room">
                
                <div className='myborder'>
                <div class="subhead">
                    <p class='lead'>
                    <i className='fas fa-user'></i>Complaints Details
                    </p>
                </div>

                {complain_data}
                </div>
            </div>
        )
    }
}

export default ViewComplains