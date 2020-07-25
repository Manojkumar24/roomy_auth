import React, { Component, Fragment } from "react";
import axios from "axios";

class YourComplains extends Component {
    state = {
        complains: []
    }
    componentDidMount() {
        axios.get("/api/rooms/listUserComplain/")
            .then(res => {
                this.setState({
                    complains: res.data
                })
            })
    }

    handleSubmit = (event) => {
        let complain = event.target.complain.value

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('/api/rooms/submitComplain', JSON.stringify({"complain":complain}), config).then(response => {

        }).catch(error => {
            console.log(error);
        })
        console.log(complain);
    }

    render() {
        let complain_data = this.state.complains ? (
            this.state.complains.map(complain => {
                return (
                    <div className="usercard">

                        <div><i style={{ marginLeft: "5px", marginRight: "10px" }} class="fa fa-tag" aria-hidden="true"></i>{complain.complain} </div>
                        <div style={{ width: "60px", padding: "4px", color: "white", backgroundColor: "rgb(16, 77, 116)", borderRadius: "5px" }}>{complain.status} </div>
                        <div><i style={{ marginLeft: "5px", marginRight: "10px" }} class="fa fa-calendar" aria-hidden="true"></i>{complain.created_at}</div>

                    </div>
                )
            })
        ) : (
                <p>There are currently no complains</p>
            )
        
        return (
            <div>
                <div className="card" style={{ width: "70%", padding: "5%", marginLeft: "5%" }}>
                <form onSubmit = {this.handleSubmit} >
                    Submit a complain<input type="text" name="complain"/>
                    <input type='submit' className='btn btn-primary' value='Submit' />
                </form>
                </div>
                {complain_data}
            </div>
        )
    }
}

export default YourComplains