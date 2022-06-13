// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { toastStyleError } from "../utils/Global";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFz6IDtkbhM2fWd7y0F7VITP9lfpWQa0o",
  authDomain: "thaidrivinglicence-91309.firebaseapp.com",
  projectId: "thaidrivinglicence-91309",
  storageBucket: "thaidrivinglicence-91309.appspot.com",
  messagingSenderId: "910871436416",
  appId: "1:910871436416:web:bf44329eb4954052c6da65",
  measurementId: "G-DCREXR4DB3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const db = getFirestore();
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export async function signInWithEmailAndPw(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function createAuthUserWithEmailAndPassword(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export function onAuthStateChangeListener(callback) {
  onAuthStateChanged(auth, callback);
}

export async function signOutUser() {
  await signOut(auth);
}

export async function addResult(user, result) {
  const currentDate = new Date().toISOString();

  await addDoc(collection(db, "users", user.uid, "results"), {
    date: Date.parse(currentDate),
    result: result,
  });
}

export function returnResults(user, setResults) {
  return onSnapshot(collection(db, `users/${user.uid}/results`), (snapshot) => {
    const results = snapshot.docs
      .map((result) => result.data())
      .sort((a, b) => b.date - a.date)
      .filter((_, i) => i <= 2);

    setResults((val) => (results.length > 0 ? results : null));
  });
}

export async function forgotPassword(email) {
  return await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:3000/login",
  });
}

export async function addQuestionsToDB(data) {
  try {
    await setDoc(doc(db, "questionData", "data"), {
      data: [...data],
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

export function getQuestions(setState) {
  return onSnapshot(doc(db, `questionData/data`), (snapshot) => {
    const results = snapshot.data();

    setState((val) => results.data);
  });
}
