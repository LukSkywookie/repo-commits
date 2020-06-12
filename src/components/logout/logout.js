import React from 'react';
import './logout.scss';
import { removeUserSession } from '../../utils/common';
import { withRouter } from 'react-router-dom';

class Logout extends React.PureComponent {
  // Obsługa przycisku "Wyloguj"
  handleLogout = () => {
    removeUserSession();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="logout">
        {
          <button onClick={this.handleLogout} value="Wyloguj">Wyloguj</button>
        }
      </div>
    )
  }
}

export default withRouter(Logout);
