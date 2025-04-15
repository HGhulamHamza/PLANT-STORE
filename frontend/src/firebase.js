// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTOdkeJzmtjWgopjJTh21U0wHcGU_KGKg",
  authDomain: "eco-roof.firebaseapp.com",
  projectId: "eco-roof",
  storageBucket: "eco-roof.firebasestorage.app",
  messagingSenderId: "974800210807",
  appId: "1:974800210807:web:4c9d5c049f686ddf616f72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };