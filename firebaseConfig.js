import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyDB7mgFkkUR4_3ozNw34QPQrv3TaZuiGl0",
  authDomain: "useraut-426401.firebaseapp.com",
  projectId: "useraut-426401",
  storageBucket: "useraut-426401.appspot.com",
  messagingSenderId: "51521225167",
  appId: "1:51521225167:android:d1d1489c69bd03a7a012ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);

export { auth, db };
