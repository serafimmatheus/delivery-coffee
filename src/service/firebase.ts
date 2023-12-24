import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv0z8XlV6J4IFs41QsBlRff9w_NiN1YFA",
  authDomain: "coffee-delivery-416bb.firebaseapp.com",
  projectId: "coffee-delivery-416bb",
  storageBucket: "coffee-delivery-416bb.appspot.com",
  messagingSenderId: "830346605895",
  appId: "1:830346605895:web:e57638daedbd065cccc862",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
