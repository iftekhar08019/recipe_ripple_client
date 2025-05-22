// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXwDsDWlQW6HCygInDLpyhPDt3ASDEmnM",
  authDomain: "recipe-ripple.firebaseapp.com",
  projectId: "recipe-ripple",
  storageBucket: "recipe-ripple.firebasestorage.app",
  messagingSenderId: "315251894945",
  appId: "1:315251894945:web:cb7189e41c79131b30dee0"
};

const app = initializeApp(firebaseConfig);

export default app;
