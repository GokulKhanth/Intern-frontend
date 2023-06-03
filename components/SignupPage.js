// SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import "./signup.css";

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    axios
      .post('http://keshav.ddns.net:5000/api/signup', {
        name,
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  return (
 <div class="main1">  	
	<div class="signup">
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <input class="input-signup"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input class="input-signup"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input class="input-signup"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input class="input-signup"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button class="sign-btn" type="submit">Signup</button>
      </form>
</div>
<div class="loginhere">
      {message && <p class="msg">{message}</p>}
		<p class="a1">Already an user?</p>
        <p class="a1"><a href="/login">click here </a> to login</p>
			</div>

    </div>
  );
}

export default SignupPage;
