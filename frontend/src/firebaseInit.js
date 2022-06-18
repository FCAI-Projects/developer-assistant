import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBecR_KRHRfAkAGIW0Wh8qIPhCrtJc6oeM",
  authDomain: "developer-assistant-ee82e.firebaseapp.com",
  projectId: "developer-assistant-ee82e",
  storageBucket: "developer-assistant-ee82e.appspot.com",
  messagingSenderId: "611396494704",
  appId: "1:611396494704:web:2da91173cdae7a0a395bb5",
  measurementId: "G-Q9LJT2K27X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// const analytics = getAnalytics(app);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

  export const backgroundMessageListener = () => {
    new Promise((resolve) => {
      messaging.backgroundMessageListener((payload) => {
        resolve(payload);
      });
    });
  }

 