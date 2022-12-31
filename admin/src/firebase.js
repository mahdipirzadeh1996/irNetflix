import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD9MsyuCyp3_8PUtfL69dSnMpK6e5oYA-s",
    authDomain: "ramoona-40257.firebaseapp.com",
    projectId: "ramoona-40257",
    storageBucket: "ramoona-40257.appspot.com",
    messagingSenderId: "688543637132",
    appId: "1:688543637132:web:41655bdf6d04449ba5e5a9",
    measurementId: "G-P58CHZ0BE4"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;