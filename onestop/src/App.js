import React, { useState } from 'react';
import LoginForm from './Login/LoginForm';
import SignUpForm from './Login/SignUpForm';
import Dashboard from './dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  if (user) {
    return <Dashboard username={user} />;
  }

  return (
    <div>
      {isSignUp ? (
        <SignUpForm onSignUp={(newUser) => setUser(newUser)} />
      ) : (
        <LoginForm onLogin={(loggedInUser) => setUser(loggedInUser)} onSwitch={() => setIsSignUp(true)} />
      )}
    </div>
  );
}

export default App;
