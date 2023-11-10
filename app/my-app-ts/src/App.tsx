import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./components/firebase";
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { NavigationHeader  } from './components/NavigationHeader';
import Contents from './components/Contents'; 

function App() {
    const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
    onAuthStateChanged(fireAuth, user => {
      setLoginUser(user);
    });

  return (
    <BrowserRouter>
      <NavigationHeader />
      <Routes>
        <Route  path="/knowledge" element={loginUser ? <Contents /> : null} >
        </Route>
        <Route  path="/signup" element={<Signup />} >
        </Route>
        <Route path="/login" element={<Login />} >
        </Route>
        <Route path="/" element={<Home />} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;