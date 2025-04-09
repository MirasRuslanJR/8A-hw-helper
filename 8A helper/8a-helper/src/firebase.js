import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

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

// Инициализация аутентификации и базы данных
const auth = getAuth(app);
const db = getFirestore(app);

// Пример работы с коллекцией
const getAllHomeworks = async () => {
  try {
    const homeworkCollectionRef = collection(db, "homeworks"); // db передается корректно
    const snapshot = await getDocs(homeworkCollectionRef);
    const homeworkList = snapshot.docs.map(doc => doc.data()); // Получаем данные из всех документов
    return homeworkList;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

// Пример работы с документом
const getHomeworkById = async (homeworkId) => {
  try {
    const homeworkDocRef = doc(db, "homeworks", homeworkId);  // Пример получения документа по ID
    const snapshot = await getDoc(homeworkDocRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("Документ не найден");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении документа:", error);
  }
};

// Экспорт всех необходимых функций
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  getDoc,
  setDoc,
  getAllHomeworks,
  getHomeworkById
};
