import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp;
let messaging: Messaging; 

if (typeof window !== "undefined" && "navigator" in window) {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  messaging = getMessaging(app);
  // getToken(messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_PUBLIC_KEY}).then((currentToken) => {
  //   console.log('currentToken', currentToken);
  // });
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  })
}


export { app, messaging };