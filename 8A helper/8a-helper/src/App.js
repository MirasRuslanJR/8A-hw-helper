import './App.css';
import './index.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AuthForm from './AuthForm';
import HomeworkHelper from './HomeworkHelper';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <HomeworkHelper /> : <AuthForm />}
    </div>
  );
}

export default App;

