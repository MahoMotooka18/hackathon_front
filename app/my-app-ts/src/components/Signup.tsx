import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';

export const Signup= () => {
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

 /**
   * サインアップする
   */

    const CreateUser = () => {
        createUserWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("新しいユーザーが作成されました: " + user.displayName +"さん");
        setEmail(""); 
        setPassword("");
        navigate('/');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
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
          <button onClick={CreateUser}>新規登録</button>
        </div>
      </div>
    );
};

export default Signup;