import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyAMMrTWIU5gKeCDKwiLwO-7liVvfpT8u-M",
  authDomain: "mikiko-c5ca4.firebaseapp.com",
  databaseURL: "https://mikiko-c5ca4-default-rtdb.firebaseio.com",
  projectId: "mikiko-c5ca4",
  storageBucket: "mikiko-c5ca4.appspot.com",
  messagingSenderId: "774801735464",
  appId: "1:774801735464:web:e5499e3c4d19306cd51a1d",
  measurementId: "G-CDHBDR4Y55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export { db, database };
