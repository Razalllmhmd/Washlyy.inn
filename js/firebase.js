import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCCCR-CVjuc0UiOZmpOwiGCGLhX20ydy0w",
  authDomain: "washlyy-40db1.firebaseapp.com",
  projectId: "washlyy-40db1",
  storageBucket: "washlyy-40db1.firebasestorage.app",
  messagingSenderId: "750910509070",
  appId: "1:750910509070:web:d781594c00665430012c5f",
  measurementId: "G-Y7NTH4VM6L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);