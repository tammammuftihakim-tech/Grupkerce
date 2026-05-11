// Firebase Configuration
// Project: monitoring-iot-29ac6

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfGSE9_yWVUmlrsCJNxz0tVKl3dzSA9eA",
  authDomain: "dashboard-greenhose.firebaseapp.com",
  databaseURL: "https://dashboard-greenhose-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dashboard-greenhose",
  storageBucket: "dashboard-greenhose.firebasestorage.app",
  messagingSenderId: "957077385763",
  appId: "1:957077385763:web:bebf7f90c4de036820b796",
  measurementId: "G-5YHMBQG29D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
