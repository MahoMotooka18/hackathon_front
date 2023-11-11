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
      <h3 className="PageHeader_title">ログアウトはこちらから</h3>
      <nav>
        <button type="button" onClick={Logout}>ログアウト</button>
      </nav>
    </header>
  );
};

export default NavigationHeader;