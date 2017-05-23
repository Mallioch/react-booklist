import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Navigation from './Navigation.js';
import BookList from './BookList.js';
import AddBook from './AddBook.js';
import { store } from './store/store.js';


//Following the RR example here: https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends React.Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    //console.log('app state', this.state);
    return (
      <Router>
        <div className="App container">
          <Navigation isLoggedIn={this.state.isLoggedIn} />
          <Route path="/signup" render={(props) => <SignUp {...this.state} history={props.history} /> } />
          <Route path="/login" render={(props) => <Login history={props.history} />} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/booklist" component={BookList} />
          <PrivateRoute path="/addbook" component={AddBook} />
        </div>
      </Router>
    );
  }
}

export default App;
