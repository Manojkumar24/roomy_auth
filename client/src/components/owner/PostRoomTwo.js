import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class PostRoomTwo extends Component{

    state = {
        rent: '',
        vacancyNumber:''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let Copystate = JSON.parse(JSON.stringify(this.state));
        Copystate.rent = parseInt(this.state.rent);
        Copystate.vacancyNumber = parseInt(this.state.vacancyNumber);
        let prev_form_data = JSON.parse(localStorage.getItem('form_data'))
        
        
        let form_data = {
            ...prev_form_data,...Copystate
        }

        console.log(form_data)

        localStorage.setItem('form_data', JSON.stringify(form_data))

        this.setState({ state: Copystate }, () => { this.props.history.push('/details/3') });

    }
    render(){
        return(
            <div>
                <h3>Post a room</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Number of vacancies</label>
                        <input type="number" name="vacancyNumber" required = {true} onChange = {this.handleChange}/>

                        <label>Rent</label>
                        <input type="number" name="rent" required = {true} onChange = {this.handleChange}/>

                        <button style={{ margin: "10px" }} type="submit" className="waves-effect waves-light btn-large" >Next</button>
                        <Link to="/details/1"><button style={{ margin: "10px" }} className="waves-effect waves-light btn-large" >Previous</button></Link>
                    </div>
                </form>

                {/* {console.log(this.state)} */}
                
            </div>
        );
    }
}

export default PostRoomTwo;

