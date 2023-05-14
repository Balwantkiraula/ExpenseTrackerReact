// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJcNKKSIcUVsLmg9FdEsajZCwyPCR5cZw",
  authDomain: "expensetracker-23569.firebaseapp.com",
  databaseURL: "https://expensetracker-23569-default-rtdb.firebaseio.com",
  projectId: "expensetracker-23569",
  storageBucket: "expensetracker-23569.appspot.com",
  messagingSenderId: "205154800963",
  appId: "1:205154800963:web:3da7aa4f6469deacab8bf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
