import React, { Component } from 'react';
import axios from 'axios'

class PostRoomOne extends Component {

    state = {
        name: null,
        address: null,
        sq_ft: null,
        phonenum: null,
        city: null,
        state: null,
        pincode: null,
        rent: '',
        availability: '',
        trial: '',
        smoker: '',
        earlybird: '',
        nightowl: '',
        pets: '',
        vegetarians: '',
        furnished: '',
        wifi: '',
        parking: '',
        gender: ''
    }

    componentDidMount = () =>{
        axios.get("/api/rooms/getRoomDetails/" + this.props.match.params.room_id)
            .then(res => {
                // console.log(res.data);
                this.setState ({
                    name: res.data.name,
                    address: res.data.address,
                    sq_ft: res.data.sq_ft,
                    phonenum: res.data.phonenum,
                    city: res.data.city,
                    state: res.data.state,
                    pincode: res.data.pincode,
                    rent: res.data.rent,
                    availability: res.data.availability,
                    trial: res.data.trial,
                    smoker: res.data.smoker,
                    earlybird: res.data.earlybird,
                    nightowl: res.data.nightowl,
                    pets: res.data.pets,
                    vegetarians: res.data.vegetarians,
                    furnished: res.data.furnished,
                    wifi: res.data.wifi,
                    parking: res.data.parking,
                    gender: res.data.gender
                });
            })

            // console.log(this.state);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state);
        let Copystate = JSON.parse(JSON.stringify(this.state));
        Copystate.rent = parseInt(this.state.rent);
        Copystate.availability = parseInt(this.state.availability);

        if (this.state.phonenum > 9999999999 || this.state.phonenum < 1111111111) {
            window.alert('Enter a valid phone number of 10 digits!')
        }

        else if (this.state.pincode > 999999 || this.state.pincode < 111111) {
            window.alert('Enter a valid pincode of 6 digits!')
        }

        else if (Copystate.availability > 5 && Copystate.availability <= 0) {
            window.alert('Availability must be a number between 0 and 5')
        }

        else {
            let Copystate = JSON.parse(JSON.stringify(this.state))
            Copystate.sq_ft = parseInt(this.state.sq_ft)            

            console.log(Copystate)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios.post('/api/rooms/updateRoom/', JSON.stringify({ "form_data": Copystate,"room_id":this.props.match.params.room_id}), config).then(response => {
                // console.log(response);
                this.props.history.push('/dashboard');

            }).catch(error => {
                console.log(error);
            })


        }

    }
    render() {
        return (
            <div>
                <h3>Post a room</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name of the house</label>
                        <input type="text" name="name" placeholder="House Name" required={true} value={this.state.name}  onChange={this.handleChange} />

                        <label>Square Feet</label>
                        <input type="number" name="sq_ft" placeholder="Square Feet" required={true} value={this.state.sq_ft}  onChange={this.handleChange} />

                        <label>Address</label>
                        <input type="text" name="address" placeholder="Address" required={true} value={this.state.address}  onChange={this.handleChange} />

                        <label>City</label>
                        <input type="text" name="city" placeholder="City" required={true} value={this.state.city}  onChange={this.handleChange} />

                        <label>State</label>
                        <input type="text" name="state" placeholder="State" required={true} value={this.state.state}  onChange={this.handleChange} />

                        <label>Pin Code</label>
                        <input type="number" name="pincode" placeholder="Pin Code" required={true} value={this.state.pincode}  onChange={this.handleChange} />

                        <label>Contact Number</label>
                        <input type="number" name="phonenum" placeholder="Contact Number" required={true} value={this.state.phonenum}  onChange={this.handleChange} />

                        <label>Number of vacancies</label>
                        <input type="number" placeholder="Availability" name="availability" required={true} value={this.state.availability}  onChange={this.handleChange} />

                        <label>Rent</label>
                        <input type="number" name="rent" placeholder="Monthly Rent" required={true} value={this.state.rent}  onChange={this.handleChange} />


                        <div onChange={this.handleChange.bind(this)}>
                            <label>Do you want users to have a 7 day trial<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="trial" checked={"Yes" === this.state.trial} />
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="trial" checked={"No" === this.state.trial} />
                                <span>No</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Smoker <br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="smoker" checked={"Yes" === this.state.smoker}/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="smoker" checked={"No" === this.state.smoker}/>
                                <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="smoker" checked={"Not sure" === this.state.smoker}/>
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Early Bird<br></br></label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="earlybird" checked={"Yes" === this.state.earlybird}/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="earlybird" checked={"No" === this.state.earlybird}/>
                                <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="earlybird" checked={"Not sure" === this.state.earlybird}/>
                                <span>Not sure</span>
                            </label>

                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Night Owl<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="nightowl" checked={"Yes" === this.state.nightowl}/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="nightowl" checked={"No" === this.state.nightowl}/>
                                <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="nightowl" checked={"Not sure" === this.state.nightowl}/>
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Pets <br></br></label>
                            <label>
                                <input class="with-gap" type="radio" value="Dogs" name="pets" checked={"Dogs" === this.state.pets}/>
                                <span>Dogs</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Cats" name="pets" checked={"Cats" === this.state.pets}/>
                                <span>Cats</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Birds" name="pets" checked={"Birds" === this.state.pets}/>
                                <span>Birds</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Others" name="pets" checked={"Others" === this.state.pets}/>
                                <span>Others</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No Pets" name="pets" checked={"No Pets" === this.state.pets}/>
                                <span>No Pets</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="pets" checked={"Not sure" === this.state.pets}/>
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Vegetarian<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="vegetarians" checked={"Yes" === this.state.vegetarians}/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="vegetarians" checked={"No" === this.state.vegetarians}/>
                                <span>No</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="vegetarians" checked={"Not sure" === this.state.vegetarians}/>
                                <span>Not sure</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Furnished<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Fully" name="furnished" checked={"Fully" === this.state.furnished}/>
                                <span>Fully</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Semi" name="furnished" checked={"Semi" === this.state.furnished}/>
                                <span>Semi</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not Furnished" name="furnished" checked={"Not Furnished" === this.state.furnished}/>
                                <span>Not Furnished</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Wifi<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Yes" name="wifi" checked={"Yes" === this.state.wifi}/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No" name="wifi" checked={"No" === this.state.wifi}/>
                                <span>No</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Parking<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Four Wheeler" name="parking" checked={"Four Wheeler" === this.state.parking}/>
                                <span>Four Wheeler</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Two Wheeler" name="parking" checked={"Two Wheeler" === this.state.parking}/>
                                <span>Two Wheeler</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Both" name="parking" checked={"Both" === this.state.parking}/>
                                <span>Both</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="No parking" name="parking" checked={"No parking" === this.state.parking}/>
                                <span>No parking</span>
                            </label>
                        </div>

                        <div onChange={this.handleChange.bind(this)}>
                            <label>Preferred Gender<br></br> </label>
                            <label>
                                <input class="with-gap" type="radio" value="Male" name="gender" checked={"Male" === this.state.gender}/>
                                <span>Male</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Female" name="gender" checked={"Female" === this.state.gender}/>
                                <span>Female</span>
                            </label>
                            <label>
                                <input class="with-gap" type="radio" value="Not sure" name="gender" checked={"Not sure" === this.state.gender}/>
                                <span>Not sure</span>
                            </label>
                        </div>

                        <button style={{ margin: "10px" }} type="submit" className="waves-effect waves-light btn-large" >Update</button>

                    </div>
                </form>

                {/* {console.log(this.state)} */}

            </div>
        );
    }
}

export default PostRoomOne;

