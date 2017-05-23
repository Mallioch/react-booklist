import React from 'react';
import $ from 'jquery';
import './login.css';
import { store, actions } from './store/store.js';

class Login extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleUsernameChange(evt) {
    store.dispatch({ type: actions.LOGIN_USERNAME_CHANGE, value: evt.target.value })
  }

  handlePasswordChange(evt) {
    store.dispatch({ type: actions.LOGIN_PASSWORD_CHANGE, value: evt.target.value })
  }

  handleLoginClick() {
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: {
        username: this.state.loginUsernameValue,
        password: this.state.loginPasswordValue
      }
    })
    .done((data) => {
      store.dispatch({ type: actions.LOGIN });
      //Success! Move them to the book list.
      this.props.history.push('/booklist');
    })
    .fail((xhr) => {
      store.dispatch({ type: actions.LOGIN_FAILURE, message: 'I am sorry, but I do not know who you are.' });
    });
  }

  render() {
    //console.log('rendering login', this.state);

    //If nothing has happened yet, nothing will show. However, if there is an error or happy message, those will be shown.
    let message;
    if (this.state.loginErrorMessage !== '') {
      message = <div className="message bad-message">{this.state.loginErrorMessage}</div>
    }

    return (
      <div className="login">
        <h2>Login</h2>
        <input
          placeholder="username"
          value={this.state.loginUsernameValue}
          onChange={(evt) => this.handleUsernameChange(evt)}
          />
        <input
          placeholder="password"
          value={this.state.loginPasswordValue}
          onChange={(evt) => this.handlePasswordChange(evt)}
          />
        <button onClick={() => this.handleLoginClick()}>login</button>

        {message}

      </div>
    );
  }

}

module.exports = Login;
