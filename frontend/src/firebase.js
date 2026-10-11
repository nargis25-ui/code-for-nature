import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCJkqvC75AlhahLGEXUCEB6UTxfFwAcRHw",
  authDomain: "ai-tracker-project-e216b.firebaseapp.com",
  projectId: "ai-tracker-project-e216b",
  storageBucket: "ai-tracker-project-e216b.firebasestorage.app",
  messagingSenderId: "167182657659",
  appId: "1:167182657659:web:d44bddce517694ca4c1ade",
  measurementId: "G-PEPZNTYF6Z"
};

const app = initializeApp(firebaseConfig);

// Export authentication
export const auth = getAuth(app);

// Export Google login provider
export const googleProvider = new GoogleAuthProvider();
