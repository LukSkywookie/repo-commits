import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import './login.scss';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obsługa przycisku "Zaloguj"
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push('/restricted');
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="login">
      <section>
        <div>
          <label>Użytkownik:</label>
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="text" {...password} autoComplete="new-password" />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        <button value={loading ? 'Ładowanie...' : 'Zaloguj się'} onClick={handleLogin} disabled={loading}>{loading ? 'Ładowanie...' : 'Zaloguj się'}</button>
      </section>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;
