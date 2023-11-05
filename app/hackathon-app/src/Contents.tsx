import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import LoginForm from './LoginForm'

function Contents() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <h1>knowledge base</h1>
          </p>
        </header>
        <body>
        <div>
          <h2>技術ブログ</h2>
          <p>
            技術ブログに関する説明やリンクの一覧
          </p>
          <a href="#">技術ブログの追加</a>
        </div>
        <div>
          <h2>技術書</h2>
          <p>
            技術書に関する説明やリンクの一覧
          </p>
          <a href="#">技術書の追加</a>
        </div>
        <div>
          <h2>技術系動画</h2>
          <p>
            技術系動画に関する説明やリンクの一覧
          </p>
          <a href="#">技術系動画の追加</a>
        </div>
        </body>
      </div>
    );
  }
  
  export default Contents;