import React, { useState } from "react";
import'./App.css';
import'./index.css';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase"; // Импортируем Firebase auth функции

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Регистрация успешна");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Ошибка регистрации: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Вход успешен");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Ошибка входа: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button onClick={signUp} disabled={loading}>Регистрация</button>
      <button onClick={signIn} disabled={loading}>Войти</button>
    </div>
  );
}