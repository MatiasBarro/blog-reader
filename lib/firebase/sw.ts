import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'; // Note the '/sw' import for service workers

// Initialize Firebase App
const app = initializeApp({
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  if(!payload?.data?.default){
    console.error('Invalid notification payload', payload);
    return
  }

  //remove escaped quotes
  const cleanMessage = payload.data.default
  .replace(/^\"(.+)\"$/,'$1')
  .replace(/\\(["'])/g, '$1');

  console.log('clean message', cleanMessage)

  const {title, body}: { title: string; body: string } = JSON.parse(cleanMessage);
  
  const notificationOptions = {
    body,
    icon: '/favicon.ico',
  };

  self.registration.showNotification(title,
    notificationOptions);
});