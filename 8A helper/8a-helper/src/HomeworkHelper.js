import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  getDoc,
  setDoc,
} from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";  // Добавь это в начале файла


const firebaseConfig = {
  apiKey: "AIzaSyCAKyRrgqXlxjT79yVX9yS-MyuguA0-K5Q",
  authDomain: "site-helperfor8a.firebaseapp.com",
  projectId: "site-helperfor8a",
  storageBucket: "site-helperfor8a.firebasestorage.app",
  messagingSenderId: "378830776578",
  appId: "1:378830776578:web:477fb355289d8e5e5a3a1b",
  measurementId: "G-ZM7VTYERKQ"
};

const app = initializeApp(firebaseConfig);

export default function HomeworkHelper() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [homework, setHomework] = useState({});

  const schedule = {
    'Понедельник': [
      { id: 'mon1', time: '08:30-09:10', subject: 'Дене шынықтыру', teacher: 'Ажгалиева Г.', room: 'Спортзал' },
      { id: 'mon2', time: '09:25-10:05', subject: 'Дене шынықтыру', teacher: 'Ажгалиева Г.', room: 'Спортзал' },
      { id: 'mon3', time: '10:10-10:50', subject: 'Қазақ тілі мен әд.', teacher: 'Тажигалиева З.', room: '232' },
      { id: 'mon4', time: '11:00-11:40', subject: 'Қазақ тілі мен әд.', teacher: 'Тажигалиева З.', room: '232' },
      { id: 'mon5', time: '11:45-12:25', subject: 'Информатика', teacher: 'Алдиярова А.', room: '203' },
      { id: 'mon6', time: '12:45-13:25', subject: 'Информатика', teacher: 'Алдиярова А.', room: '203' },
      { id: 'mon7', time: '13:45-14:25', subject: 'Қазақстан тарихы', teacher: 'Хамзина Э.', room: '128' },
      { id: 'mon8', time: '14:35-15:15', subject: 'Қазақстан тарихы', teacher: 'Хамзина Э.', room: '128' },
      { id: 'mon9', time: '15:25-16:05', subject: 'Куратор сағаты', teacher: 'Қонақбаева А.', room: '306' }
    ],
    'Вторник': [
      { id: 'tue1', time: '08:30-09:10', subject: 'Қазақ тілі мен әд.', teacher: 'Тажигалиева З.', room: '232' },
      { id: 'tue2', time: '09:25-10:05', subject: 'Қазақ тілі мен әд.', teacher: 'Тажигалиева З.', room: '232' },
      { id: 'tue3', time: '10:10-10:50', subject: 'Физика', teacher: 'Мусагалиева Э.', room: '130' },
      { id: 'tue4', time: '11:00-11:40', subject: 'Физика', teacher: 'Мусагалиева Э.', room: '130' },
      { id: 'tue5', time: '11:45-12:25', subject: 'Ағылшын тілі', teacher: 'Темиргазиева С.', room: '205' },
      { id: 'tue6', time: '12:45-13:25', subject: 'Ағылшын тілі', teacher: 'Темиргазиева С.', room: '205' },
      { id: 'tue7', time: '13:45-14:25', subject: 'Математика', teacher: 'Нурмаганбетова Б.', room: '212' },
      { id: 'tue8', time: '14:35-15:15', subject: 'Математика', teacher: 'Нурмаганбетова Б.', room: '212' }
    ],
    'Среда': [
      { id: 'wed1', time: '08:30-09:10', subject: 'Қазақ тілі мен әдебиеті', teacher: 'Тажигалиева З.', room: '232' },
      { id: 'wed2', time: '09:25-10:05', subject: 'Физика', teacher: 'Мусагалиева Э.', room: '231' },
      { id: 'wed3', time: '10:10-10:50', subject: 'Орыс тілі мен әд.', teacher: 'Унгаралиева Э.', room: '210' },
      { id: 'wed4', time: '11:00-11:40', subject: 'Орыс тілі мен әд.', teacher: 'Унгаралиева Э.', room: '210' },
      { id: 'wed5', time: '11:45-12:25', subject: 'Химия', teacher: 'Ишанова Г.', room: '125' },
      { id: 'wed6', time: '12:45-13:25', subject: 'Химия', teacher: 'Ишанова Г.', room: '125' },
      { id: 'wed7', time: '13:45-14:25', subject: 'География', teacher: 'Бегжанова М.', room: '130' },
      { id: 'wed8', time: '14:35-15:15', subject: 'География', teacher: 'Бегжанова М.', room: '130' }
    ],
    'Четверг': [
      { id: 'thu1', time: '08:30-09:10', subject: 'Өнер', teacher: 'Кульбекова Ж.', room: '136' },
      { id: 'thu2', time: '09:25-10:05', subject: 'Өнер', teacher: 'Кульбекова Ж.', room: '136' },
      { id: 'thu3', time: '10:10-10:50', subject: 'Математика', teacher: 'Нурмаганбетова Б.', room: '307' },
      { id: 'thu4', time: '11:00-11:40', subject: 'Математика', teacher: 'Нурмаганбетова Б.', room: '307' },
      { id: 'thu5', time: '11:45-12:25', subject: 'Биология', teacher: 'Каженов Р.', room: '242' },
      { id: 'thu6', time: '12:45-13:25', subject: 'Биология', teacher: 'Каженов Р.', room: '242' },
      { id: 'thu7', time: '13:45-14:25', subject: 'Қоғамға қызмет', teacher: 'Қонақбаева А.', room: '243' },
      { id: 'thu8', time: '15:25-16:05', subject: 'Improve Your English', teacher: 'Темиргазиева С.', room: '204' },
      { id: 'thu9', time: '16:10-16:50', subject: 'Improve Your English', teacher: 'Темиргазиева С.', room: '204' }
    ],
    'Пятница': [
      { id: 'fri1', time: '08:30-09:10', subject: 'Математика', teacher: 'Нурмаганбетова Б.', room: '303' },
      { id: 'fri2', time: '09:25-10:05', subject: 'Орыс тілі мен әд.', teacher: 'Унгаралиева Э.', room: '210' },
      { id: 'fri3', time: '10:10-10:50', subject: 'Дүниежүзі тарихы', teacher: 'Иргалиев С.', room: '228' },
      { id: 'fri4', time: '11:00-11:40', subject: 'Дүниежүзі тарихы', teacher: 'Иргалиев С.', room: '228' },
      { id: 'fri5', time: '11:45-12:25', subject: 'Биология', teacher: 'Каженов Р.', room: '242' },
      { id: 'fri6', time: '12:45-13:25', subject: 'Химия', teacher: 'Ишанова Г.', room: '125' },
      { id: 'fri7', time: '13:45-14:25', subject: 'Ағылшын тілі', teacher: 'Темиргазиева С.', room: '241' },
      { id: 'fri8', time: '14:35-15:15', subject: 'Ағылшын тілі', teacher: 'Темиргазиева С.', room: '241' }
    ]
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        const docRef = doc(db, "homeworks", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHomework(docSnap.data());
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const signUp = async () => {
    try {
      if (!email || !password) throw new Error("Все поля обязательны для заполнения");
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Регистрация успешна!");
    } catch (error) {
      alert(error.message || "Ошибка при регистрации");
    }
  };

  const signIn = async () => {
    try {
      if (!email || !password) throw new Error("Все поля обязательны для заполнения");
      await signInWithEmailAndPassword(auth, email, password);
      alert("Вы успешно вошли в систему!");
    } catch (error) {
      alert(error.message || "Ошибка при входе");
    }
  };

  const logout = async () => {
    await signOut(auth);
    alert("Выход из системы");
  };

  const handleHomeworkChange = (id, value) => {
    const updatedHomework = {
      ...homework,
      [id]: { ...homework[id], value, modifiedBy: user ? user.email : "Не авторизован" }
    };
    setHomework(updatedHomework);
    localStorage.setItem('homework', JSON.stringify(updatedHomework));
  };

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Вход / Регистрация</h1>
        <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-4 w-full" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={signIn} className="bg-blue-500 text-white p-2 rounded">Войти</button>
          <button onClick={signUp} className="bg-green-500 text-white p-2 rounded">Регистрация</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Домашки</h1>
        <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Выйти</button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Ваше расписание</h2>
        {Object.entries(schedule).map(([day, lessons]) => (
          <div key={day} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{day}</h3>
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold">{lesson.subject}</h4>
                  <p>{lesson.time}</p>
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Домашка"
                    value={homework[lesson.id]?.value || ""}
                    onChange={(e) => handleHomeworkChange(lesson.id, e.target.value)}
                    className="border p-2 w-64"
                  />
                  {homework[lesson.id]?.modifiedBy && (
                    <p className="text-sm text-gray-500">Изменено: {homework[lesson.id].modifiedBy}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}