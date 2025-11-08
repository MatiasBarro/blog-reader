'use client'
import { useEffect } from "react";
import { initializeFirebase } from "../lib/firebase/index.ts";

export function useInitializePushNotifications() {
    useEffect(() => {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            const { app, messaging} = initializeFirebase();
            console.log('Notification permission granted.', messaging);
        } else {
            console.log('Unable to get permission to notify.');
        }
        });
    },[])
}