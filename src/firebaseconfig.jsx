import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase (obtén estos datos de la consola de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyCEDptg4afZyXerZUCBAjSNuvKR3JKWNVo",
  authDomain: "ejercicio-761e7.firebaseapp.com",
  projectId: "ejercicio-761e7",
  storageBucket: "ejercicio-761e7.firebasestorage.app",
  messagingSenderId: "939414470387",
  appId: "1:939414470387:web:384c93ceadb96b989b8186"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
