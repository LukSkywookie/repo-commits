import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../logout/logout';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav>
          <ul>
            <li><NavLink exact activeClassName="active" to="/">Strona powitalna</NavLink></li>
            <li><NavLink activeClassName="active" to="/login">Logowanie</NavLink></li>
            <li><NavLink activeClassName="active" to="/restricted">Lista repozytoriów</NavLink></li>
          </ul>
        </nav>
        {!this.props.isLoggedIn ? <Logout isLoggedIn={this.props.isLoggedIn} /> : null}
      </header>
    )
  }
}

export default Header;
