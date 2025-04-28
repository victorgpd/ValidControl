import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwHdB8gKY55rtMkFnVybtaevYw_G1f8KI",
  authDomain: "validcontrol-7069f.firebaseapp.com",
  projectId: "validcontrol-7069f",
  storageBucket: "validcontrol-7069f.firebasestorage.app",
  messagingSenderId: "927097783443",
  appId: "1:927097783443:web:c9f5d56f3e241e86f83966",
  measurementId: "G-304ZTE8SZM",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { app, auth, db, storage };
