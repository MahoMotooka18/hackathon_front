import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { Login } from './Login';

export const NavigationHeader: React.FC = () => {
    
    const Logout = async() => {
        signOut(fireAuth).then(() => {
        window.location.href = '/';    
        alert("ログアウトしました");
        })
        .catch((error) => {
            alert(error.message);
        });
    };

  return (
    <header className="PageHeader_header">
      <h1 className="PageHeader_title">knowledge baseにようこそ!</h1>
      <nav>
        <ul className="PageHeader_nav">
          <li>
          <button type="button" onClick={Login}>ログイン</button>
          </li>
          <li>
            <button type="button" onClick={Logout}>ログアウト</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;