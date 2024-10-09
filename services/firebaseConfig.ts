import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "cryptotest-16280.firebaseapp.com",
  projectId: "cryptotest-16280",
  storageBucket: "cryptotest-16280.appspot.com",
  messagingSenderId: "462591094596",
  appId: "1:462591094596:web:84bb3ade11e74a6842f111",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
