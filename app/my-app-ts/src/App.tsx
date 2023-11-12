import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./component/firebase";
import { Home } from './component/Home';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { NavigationHeader  } from './component/NavigationHeader';
import Contents from './component/Contents'; 
import logo from './logo.svg';
import './App.css';
import KnowledgePostForm from './component/KnowledgePostForm';

function App() {
    const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
    onAuthStateChanged(fireAuth, user => {
      setLoginUser(user);
    });

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    <BrowserRouter>
      <Routes>
        <Route  path="/knowledge" element={loginUser ? <Contents /> : null}  >
        </Route>
        <Route  path="/knowledgepost" element={loginUser ? <KnowledgePostForm /> : null} >
        </Route>
        <Route  path="/signup" element={<Signup />} >
        </Route>
        <Route path="/login" element={<Login />} >
        </Route>
        <Route path="/" element={<Home />} >
        </Route>
      </Routes>
      <NavigationHeader />
    </BrowserRouter>
    </header>
    </div>
  );
}


export default App;