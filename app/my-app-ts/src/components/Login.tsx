import { useState } from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';


export const Login= () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };


    const SignIn = () => {
        signInWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("ようこそ: " + name + "さん");
        navigate('/knowledge');
        setName(""); 
        setEmail("");
        setPassword("");

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }


    return (
      <div>
        <div>
          <input type="text" id="name" placeholder="名前" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <input type="email" id="email" placeholder="メールアドレス" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <input type="password" id="password" placeholder="パスワード" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button onClick={SignIn}>ログイン</button>
        </div>
      </div>
    );
};

export default Login;