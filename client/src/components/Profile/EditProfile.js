import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
//import { ChangePassAccount } from "../../actions/profile";
import Navbar from '../layout/Navbar';
import './Editprofile.css';

const EditProfile = ({
  profile: { profile, loading },
  editProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',

    phonenum: '',
    profession: '',
    hobbies1: '',
    hobbies2:'',
    hobbies3: ''
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      name: loading || !profile.name ? '' : profile.name,
      email: loading || !profile.email ? '' : profile.email,
      password: loading || !profile.password ? '' : profile.password,
      profession: loading || !profile.profession ? '' : profile.profession,
      hobbies1: loading || !profile.hobbies.hobbies1 ? '' : profile.hobbies.hobbies1,
      hobbies2: loading || !profile.hobbies.hobbies2 ? '' : profile.hobbies.hobbies2,
      hobbies3: loading || !profile.hobbies.hobbies3 ? '' : profile.hobbies.hobbies3,
      phonenum: loading || !profile.phonenum ? '' : profile.phonenum,
    });
  }, [loading]);

  const {
    name,
    email,
    password,
    profession,
    hobbies1,
    hobbies2,
    hobbies3,
    phonenum,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    editProfile(formData);
  };

  return (
    <Fragment>
      <div class="bg-img"></div>
       <div class="review-room">
               <h3 style={{color:"white"}}> Profile </h3>
                <div className='myborder'>
                <div class="subhead">
                    <p class='lead'>
                    <i className='fas fa-comments-o'></i>Edit Profile
                    </p>
                </div>
                <form onSubmit={(e) => onSubmit(e)}>
                    <span>
                    <i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-user"  aria-hidden="true"></i>
                      Username:</span>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='UserName'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                    <span>
                    <i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-user-tie"  aria-hidden="true"></i>
                      Profession:</span>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='profession'
                      name='profession'
                      value={profession}
                      onChange={(e) => onChange(e)}
                      
                    />
           
                    <span>
                    <i style={{marginLeft:"5px",marginRight:"10px"}} class="fa fa-envelope"  aria-hidden="true"></i>
                      Email:</span>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='email'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      disabled
                    />

                    <span>Hobbies:</span> 
                    <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 1"
                      name="hobbies1"
                      value={hobbies1}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 2"
                      name="hobbies2"
                      value={hobbies2}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 3"
                      name="hobbies3"
                      value={hobbies3}
                      onChange={e => onChange(e)}
                    />
                  </div>    

                  <span>PhoneNum</span>
                  <input
                      className='editproinput'
                      type='number'
                      placeholder='phone number'
                      name='phonenum'
                      value={phonenum}
                      onChange={(e) => onChange(e)}
                    />

                <button className='editprobtn' type='submit'>
                                    Save
                                  </button>
                    <div style={{padding:"2%"}}> 
                    <Link to='/pw_change'><button className='editprobtn'>Change Password  </button> </Link>
                    <Link to='/mail_change'><button className='editprobtn'>Change Email </button> </Link>
                     </div>                      
                </form>
              </div>
  



                    
     
     </div>
       
    {/* <div className="edit-profile">
      <br />
      <br />
      <div className='editprotop'>
        <div className='myrectop_cont'>Edit profile</div>
        <hr className='myrechr1' />
      </div>
      <div className='editpro_bg'>
        <br />
        <br />
        <br />
        <div className='container'>
          <div className='row editprobot'>
            <div className='col-lg-8'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Username:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='UserName'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Email:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='email'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      disabled
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Profession:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='profession'
                      name='profession'
                      value={profession}
                      onChange={(e) => onChange(e)}
                      
                    />
                  </div>
                </div>

                              <div className="row editprorows">
                <div className="col-lg-3 editprotext">Hobbies:</div>
                <div className="col-lg-9">
                  <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 1"
                      name="hobbies1"
                      value={hobbies1}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 2"
                      name="hobbies2"
                      value={hobbies2}
                      onChange={e => onChange(e)}
                    />
                  </div>

                  <div>
                    <input
                      className="editproinput"
                      type="text"
                      placeholder="Hobbies 3"
                      name="hobbies3"
                      value={hobbies3}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>
              </div>


                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Phonenum:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='number'
                      placeholder='phone number'
                      name='phonenum'
                      value={phonenum}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>

                <br />
                <div>
                  <button className='editprobtn' type='submit'>
                    Save
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
            <div className='col-lg-4' style={{ paddingTop: '3%' }}>
              <Link to='/pw_change'>Password Change </Link>

              {/* <button className="editprobtn2">  */}
                {/* <Link to='/mail_change'>Mail Change </Link> */}
              {/* </button> */}
               {/* <button className="editprobtn2" onClick={() => ChangePassAccount()}>
              <i className="fas fa-trash"></i> &nbsp; Change password Account */}
            {/* </button>  */}
            {/* </div>
          </div>
        </div>
      </div> 
      </div> */}
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  EditProfile
);
