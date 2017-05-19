import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Navigation from './Navigation.js';
import BookList from './BookList.js';
import { store } from './store/store.js';

class App extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    return (
      <Router>
        <div className="App container">
          <Navigation isLoggedIn={this.state.isLoggedIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" render={(props) => <Login history={props.history} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/booklist" component={BookList} />
        </div>
      </Router>
    );
  }
}

export default App;
