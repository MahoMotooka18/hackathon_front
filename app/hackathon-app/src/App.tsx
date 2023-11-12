import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import LoginForm from './LoginForm'
import Contents from './Contents'

function App() {
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <LoginForm/>
          {loginUser ? <Contents /> : null}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
