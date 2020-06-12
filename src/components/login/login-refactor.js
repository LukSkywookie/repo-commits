import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import './login.scss';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      setError: null,
      loading: false,
      setLoading: false,
      value: '',
      setValue: ''
    }
  }

  useFormInput = initialValue => {
    this.setState({
      value: initialValue,
      setValue: initialValue
    });

    const handleChange = e => {
      this.setState({
        setValue: e.target.value
      });
    }
    console.log(this.state.value)
    return (
      this.state.value,
      this.state.onChange = handleChange
    )
  }

  componentDidMount() {
    this.username = this.useFormInput('');
    this.password = this.useFormInput('');
  }

  handleLogin = () => {
    this.setState({
      setError: null,
      setLoading: true
    })

    axios.post('http://localhost:4000/users/signin', { username: this.username.value, password: this.password.value })
      .then(response => {
        this.setState({
          setLoading: false
        })
        setUserSession(response.data.token, response.data.user);
        this.props.history.push('/restricted');
      }).catch(error => {
        this.setState({
          setLoading: false
        })
        if (error.response.status === 401)
          this.setState({
            setError: error.response.data.message
          })
        else
          this.setState({
            setError: "Something went wrong. Please try again later."
          })
      });
  }

  render() {
    return (
      <div className="login">
        <section>
          <div>
            <label>Użytkownik:</label>
            <input type="text" {...this.username} autoComplete="new-password" />
          </div>
          <div>
            <label>Hasło:</label>
            <input type="text" {...this.password} autoComplete="new-password" />
          </div>
          {this.state.error && <><small style={{ color: 'red' }}>{this.state.error}</small><br /></>}<br />
          <button value={this.state.loading ? 'Ładowanie...' : 'Login'} onClick={this.handleLogin} disabled={this.state.loading}>{this.state.loading ? 'Ładowanie...' : 'Login'}</button>
        </section>
      </div>
    );
  }
}

export default withRouter(Login);
