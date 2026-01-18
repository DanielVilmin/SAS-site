import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfWsfL8Z44kSa8IsGmrZe0XfqJo1Z3ZXE",
  authDomain: "projetosas.firebaseapp.com",
  projectId: "projetosas",
  storageBucket: "projetosas.firebasestorage.app",
  messagingSenderId: "254209058728",
  appId: "1:254209058728:web:343bacaee5896174badf9d",
  measurementId: "G-4LLXNKSVGZ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Serviços Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics (opcional)
export const analytics = getAnalytics(app);
