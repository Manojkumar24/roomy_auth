import React, { Component, Fragment } from "react";
import axios from "axios";

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
        let complain_data = this.state.complains ? (
            this.state.complains.map(complain => {
                return (
                    <ul>
                        <li>{complain.complain}</li>
                        <li>{complain.status}</li>
                        <li>{complain.user.name}</li>
                        <li>{complain.user.email}</li>
                        <li>{complain.created_at}</li>
                        <form onSubmit = {this.handleSubmit}>
                            <input type="text" name="id" value={complain._id} hidden/>
                            <input type='submit' className='btn btn-primary' value='Mark as closed' />
                        </form>
                    </ul>
                )
            })
        ) : (
                <p>There are currently no complains</p>
            )

        return (
            <div>
                {complain_data}
            </div>
        )
    }
}

export default ViewComplains