import { useState } from "react";
import { auth } from "./firebase"; // Импортируем auth из firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState(""); // Стейт для хранения email
  const [password, setPassword] = useState(""); // Стейт для хранения пароля

  // Функция для регистрации пользователя
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Регистрация успешна");
    } catch (error) {
      console.error("Ошибка регистрации: ", error);
    }
  };

  // Функция для входа пользователя
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Вход успешен");
    } catch (error) {
      console.error("Ошибка входа: ", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Регистрация</button>
      <button onClick={signIn}>Войти</button>
    </div>
  );
}
