import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";

export const LoginForm= () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const SignUp = () => {
        createUserWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("新しいユーザーが作成されました: " + user.displayName +"さん");
        setEmail(""); 
        setPassword("");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }

 /**
   * サインインする
   */

    const SignIn = () => {
        signInWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("ようこそ: " + user.displayName + "さん");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }

  /**
   * ログアウトする
   */
    const signOutWithEmailandPassword = () => {
        signOut(fireAuth).then(() => {
        alert("ログアウトしました");
        })
        .catch((error) => {
            alert(error.message);
        });
    };

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
          <button onClick={SignUp}>新規登録</button>
        </div>
        <div>
          <button onClick={SignIn}>ログイン</button>
        </div>
        <div>
          <button onClick={signOutWithEmailandPassword}>ログアウト</button>
        </div>
      </div>
    );
};

export default LoginForm;