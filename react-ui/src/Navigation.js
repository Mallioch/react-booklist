import React from 'react';
import cookies from './cookies.js';
import { Link } from 'react-router-dom';
import { store, actions } from './store/store.js';
import $ from 'jquery';

class Navigation extends React.Component {

  componentDidMount() {
    console.log('nav', this.context);
    this.unsub = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST'
    })
    .done(() => {
      cookies.deleteSidCookie();
      store.dispatch({ type: actions.LOGOUT });
    });

  }

  render() {

    const hasSid = cookies.hasConnectSidCookie();

    let loginStateComponent;
    if (hasSid) {
      loginStateComponent = <div>
        <div onClick={() => this.handleLogout()}>Logout</div>
      </div>
    }
    else {
      loginStateComponent = <div>
        <Link to="login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    }

    console.log('has sid', hasSid);


    return (
      <nav>
        <h1>My Book List <small>with React, Redux, Bootstrap, ReactRouter, Express, and MongoDB</small></h1>

        {loginStateComponent}
      </nav>
    );
  }

}

module.exports = Navigation;
