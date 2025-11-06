'use client'

import { useEffect } from "react";
import "../../lib/firebase";

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

export const FirebasePushNotification: React.FC = () => {
    useEffect(() => {
        requestPermission();
    },[])

    return (
        <div>
            FirebasePushNotification
        </div>
    )
}