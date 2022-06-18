// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBecR_KRHRfAkAGIW0Wh8qIPhCrtJc6oeM",
  authDomain: "developer-assistant-ee82e.firebaseapp.com",
  projectId: "developer-assistant-ee82e",
  storageBucket: "developer-assistant-ee82e.appspot.com",
  messagingSenderId: "611396494704",
  appId: "1:611396494704:web:2da91173cdae7a0a395bb5",
  measurementId: "G-Q9LJT2K27X"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
 

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };
  // eslint-disable-next-line no-restricted-globals
  //  self.registration.showNotification(

  //   notificationTitle,
  //   notificationOptions
  // );

});

 