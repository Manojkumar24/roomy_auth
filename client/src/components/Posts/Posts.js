import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { Posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Fragment>Loading ... </Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Cuisines </h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome to the salt and pepper.. </i>
      </p>
      {/* PostForm */}
      <div>
        {Posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
