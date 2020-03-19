import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const dashboard = props => {
  return <div>Your empty dash</div>;
};

dashboard.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });
export default dashboard;

// export default connect(
//   mapStateToProps,
//   { getCurrentProfile }
// )(dashboard);
