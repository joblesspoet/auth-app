import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCkOFY84OFvTFtklZkeV5B-0ciAmQUjxLE",
    authDomain: "device-log-ad1d4.firebaseapp.com",
    databaseURL: "https://device-log-ad1d4.firebaseio.com",
    projectId: "device-log-ad1d4",
    storageBucket: "device-log-ad1d4.appspot.com",
    messagingSenderId: "1020971243142",
    appId: "1:1020971243142:web:cfd18092c1ec7f37336307",
    measurementId: "G-3MYWH17NMN"
};

let app = firebase.initializeApp(firebaseConfig);
export const firebase_auth = firebase.auth();
export const firestore = firebase.firestore(app);