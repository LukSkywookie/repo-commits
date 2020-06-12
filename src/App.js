import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Welcome from './components/welcome/welcome';
import Login from './components/login/login';

import axios from 'axios';

import PrivateRoute from './utils/privateRoutes';
import PublicRoute from './utils/publicRoutes';
import { getToken, removeUserSession, setUserSession } from './utils/common';
import RestrictedMainContent from './components/restrictedMainContent/restricted-main-content';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authLoading: true,
      setAuthLoading: true,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      this.setState.setAuthLoading = false;
    }).catch(error => {
      removeUserSession();
      this.setState.setAuthLoading = false;
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header isLoggedIn={this.state.isLoggedIn} />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/restricted" component={RestrictedMainContent} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
