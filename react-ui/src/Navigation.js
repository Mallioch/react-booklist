import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { store, actions } from './store/store.js';
import $ from 'jquery';

class Navigation extends React.Component {

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST'
    })
    .done(() => {
      store.dispatch({ type: actions.LOGOUT });
      this.props.history.push('/login');
    });

  }

  render() {
    let loginStateComponent;
    if (this.props.isLoggedIn) {
      loginStateComponent = <div>
        <div onClick={() => this.handleLogout()}>Logout</div>
      </div>
    }
    else {
      loginStateComponent = <div>
        <Link to="login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    }

    return (
      <nav>
        <h1>My Book List <small>with React, Redux, Bootstrap, ReactRouter, Express, and MongoDB</small></h1>

        {loginStateComponent}
      </nav>
    );
  }

}

module.exports = withRouter(Navigation);
