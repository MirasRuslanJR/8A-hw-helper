import { initializeApp } from "firebase/app"; // Инициализация Firebase
import { getAuth } from "firebase/auth"; // Для аутентификации
import { getFirestore } from "firebase/firestore"; // Для базы данных Firestore

// Твоя конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAKyRrgqXlxjT79yVX9yS-MyuguA0-K5Q",
  authDomain: "site-helperfor8a.firebaseapp.com",
  projectId: "site-helperfor8a",
  storageBucket: "site-helperfor8a.firebasestorage.app",
  messagingSenderId: "378830776578",
  appId: "1:378830776578:web:477fb355289d8e5e5a3a1b",
  measurementId: "G-ZM7VTYERKQ"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase (аутентификация и база данных)
const auth = getAuth(app); // Аутентификация
const db = getFirestore(app); // База данных Firestore

// Экспортируем auth и db для использования в других файлах
export { auth, db };
