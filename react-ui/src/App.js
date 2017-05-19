import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Navigation from './Navigation.js';
import BookList from './BookList.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Navigation />
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
