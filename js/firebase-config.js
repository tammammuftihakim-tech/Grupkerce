// Firebase Configuration
// Project: monitoring-iot-29ac6

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMtBK4ecOuvmpAjwyIHzKRVmWfFoKKnNE",
  authDomain: "monitoring-iot-35104.firebaseapp.com",
  databaseURL: "https://monitoring-iot-35104-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "monitoring-iot-35104",
  storageBucket: "monitoring-iot-35104.firebasestorage.app",
  messagingSenderId: "175200903135",
  appId: "1:175200903135:web:224cd99680dc420cd5ae6a",
  measurementId: "G-5YHMBQG29D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
