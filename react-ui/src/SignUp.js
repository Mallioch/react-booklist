import React from 'react';
import $ from 'jquery';
import './sign-up.css';
import { store, actions } from './store/store.js';

class SignUp extends React.Component {

  handleUsernameChange(evt) {
    store.dispatch({ type: actions.SIGNUP_USERNAME_CHANGE, value: evt.target.value });
  }

  handlePasswordChange(evt) {
    store.dispatch({ type: actions.SIGNUP_PASSWORD_CHANGE, value: evt.target.value });
  }

  handleSignUpClick() {
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      data: {
        username: this.props.signupUsernameValue,
        password: this.props.signupPasswordValue
      }
    })
    .done((data) => {
      store.dispatch({ type: actions.SIGNUP });
      //Success! Move them to the book list.
      this.props.history.push('/booklist');
    })
    .fail((xhr, error, responseText) => {
      store.dispatch({ type: actions.SIGNUP_FAILURE, message: xhr.responseText });
      // console.log('xhr', xhr);
      // this.setState({
      //   errorMessage: xhr.status + ': ' + xhr.responseText,
      //   happyMessage: ''
      // });
    });
  }

  render() {

    console.log('SignUp rerender', this.props);

    //If nothing has happened yet, nothing will show. However, if there is an error or happy message, those will be shown.
    let message;
    if (this.props.signupErrorMessage !== '') {
      message = <div className="message bad-message">{this.props.signupErrorMessage}</div>
    }

    return (
      <div className="sign-up">
        <h2>Sign Up</h2>

        <input
          placeholder="username"
          value={this.props.signupUsernameValue}
          onChange={(evt) => this.handleUsernameChange(evt)}
          />
        <input
          placeholder="password"
          value={this.props.signupPasswordValue}
          onChange={(evt) => this.handlePasswordChange(evt)}
          />
        <button onClick={() => this.handleSignUpClick()}>sign up</button>

        {message}

      </div>
    );
  }

}


module.exports = SignUp;
