import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAOO386u8kgciCMMFhzNM2ccRJfAMYVsoM",
    authDomain: "sistema-chamado-2e6e2.firebaseapp.com",
    projectId: "sistema-chamado-2e6e2",
    storageBucket: "sistema-chamado-2e6e2.appspot.com",
    messagingSenderId: "334877296060",
    appId: "1:334877296060:web:3390221c84a9c9cc7b97b9",
    measurementId: "G-B3HXDP4DXX"
};

// Initialize Firebase
if (!firebase.apps.length) {
    const firebaseApp =  firebase.initializeApp(firebaseConfig);
}

export default firebase;