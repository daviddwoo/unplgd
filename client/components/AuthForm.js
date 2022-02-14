import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../store';
import { authenticateNewUser } from '../store';
import auth from '../store/auth';

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { displayName, handleLogin, handleSignup, error, name, match } = props;

  const guestCart = useSelector((state) => state.guestOrderItems);

  console.log(guestCart);

  const handleSignUp = () => {};

  if (match.path === '/' || match.path === '/signup') {
    return (
      <div>
        <form onSubmit={handleSignup} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" required />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" required />
          </div>
          <div>
            <label htmlFor="email">
              <small>e-mail</small>
            </label>
            <input name="email" type="email" required />
          </div>
          <div>
            <button type="submit">{displayName} </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  } else if (match.path === '/login') {
    return (
      <div>
        <form onSubmit={handleLogin} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    email: state.auth.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogin(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
    handleSignup(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;
      dispatch(authenticateNewUser(username, password, email, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
