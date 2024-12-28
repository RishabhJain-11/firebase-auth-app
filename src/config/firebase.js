import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDapE6iFxCao0FkoiZqvXuxZvI-IzjKaw",
    authDomain: "fir-tutorial-7c4af.firebaseapp.com",
    projectId: "fir-tutorial-7c4af",
    storageBucket: "fir-tutorial-7c4af.appspot.com",
    messagingSenderId: "887728816151",
    appId: "1:887728816151:web:814f1188e259e0b6409c52",
    measurementId: "G-NK1M5XSKJR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
