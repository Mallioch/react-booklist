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
      loginStateComponent = <div className="row">
        <div className="col-md-8">
          <ul className="nav nav-pills">
            <li className={this.props.location.pathname === '/booklist' ? 'active' : ''}><Link to="/booklist">Book List</Link></li>
            <li className={this.props.location.pathname === '/addbook' ? 'active' : ''}><Link to="/addbook">Add Book</Link></li>
          </ul>
        </div>

        <div className="col-md-4" onClick={() => this.handleLogout()}>
          <ul className="nav nav-pills">
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
    }
    else {
      loginStateComponent = <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <ul className="nav nav-pills">
            <li><Link to="login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
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
