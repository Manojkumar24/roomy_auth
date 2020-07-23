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
                    <ul>
                        <li>{complain.complain}</li>
                        <li>{complain.status}</li>
                        <li>{complain.created_at}</li>
                    </ul>
                )
            })
        ) : (
                <p>There are currently no complains</p>
            )
        
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    Submit a complain<input type="text" name="complain"/>
                    <input type='submit' className='btn btn-primary' value='Submit' />
                </form>
                {complain_data}
            </div>
        )
    }
}

export default YourComplains