import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA9H-0YbSH0VOnIz6lzy1qUQ3yBzzE9-cU",
  authDomain: "job-finder-f4fb4.firebaseapp.com",
  projectId: "job-finder-f4fb4",
  storageBucket: "job-finder-f4fb4.appspot.com",
  messagingSenderId: "1045828212542",
  appId: "1:1045828212542:web:f7a538599f27ae48ff3e6f",
  measurementId: "G-LKN2XVJ545",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
