import React, { useState } from 'react';
import './LoginForm.css';

// ✅ Reusable login function
async function login(username, password) {
  const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok && data.message === "successfully logined") {
    localStorage.setItem("token", data.token || "dummy"); // backend must return token later
    return data;
  } else {
    throw new Error(data.message || "Login failed");
  }
}

function LoginForm({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      localStorage.setItem("userstatus", true);
      onLogin(username);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {message && <div className="message">{message}</div>}
        <p>
          New here?{" "}
          <button onClick={onSwitch} className="link-button">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
