import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyDfc-b1w6ur3AfgOt6mbx9uwbcynydRATI",
    authDomain: "face-clone-a0976.firebaseapp.com",
    projectId: "face-clone-a0976",
    storageBucket: "face-clone-a0976.appspot.com",
    messagingSenderId: "781558494409",
    appId: "1:781558494409:web:5e1c4b952c3705e7c00918",
    measurementId: "G-9G31LS2T8B"
});

export const db = getFirestore();

export const storage = getStorage(app);

