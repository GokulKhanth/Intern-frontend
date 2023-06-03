import React, { useState } from 'react';
import axios from 'axios';
import './login.css'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://keshav.ddns.net:5000/api/login', {
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
        if (response.data.message === 'Login successful') {
          navigate('/profile');
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="main2">
      <div className="login">
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <input class="input-login"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input class="input-login"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button class="sign-btn" type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
