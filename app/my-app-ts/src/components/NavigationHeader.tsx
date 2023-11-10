import React from 'react';
import './NavigationHeader.css';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { fireAuth } from "./firebase";

export const NavigationHeader: React.FC = () => {
    
    const logout = async() => {
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
      <h1 className="PageHeader_title">Todoアプリ</h1>
      <nav>
        <ul className="PageHeader_nav">
          <li>
            <Link to="/login">ログイン</Link>
          </li>
          <li>テストユーザさん</li>
          <li>
            <button type="button" onClick={logout}>ログアウト</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;