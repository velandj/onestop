import React, { useState } from 'react';
import './LoginForm.css';

function SignUpForm({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/createu/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === "user created") {
        onSignUp(username);
      } else {
        setMessage("⚠️ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error, try again later");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSignUp}>
          <input type="text" placeholder="Choose username"
                 value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Choose password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default SignUpForm;
