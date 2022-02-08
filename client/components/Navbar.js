import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, orderItems }) => {
  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/cart">
            Cart ({orderItems.length ? orderItems.length : 0})
          </Link>
        </div>
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  const orderItems = state.orderItems;
  return {
    isLoggedIn: !!state.auth.id,
    orderItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
