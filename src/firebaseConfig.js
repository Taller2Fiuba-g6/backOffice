import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJHVj9xf0L8b0Ub0gBP34t5fhdFYk5uRs",
    authDomain: "taller2-fiuba.firebaseapp.com",
    databaseURL: "https://taller2-fiuba-default-rtdb.firebaseio.com",
    projectId: "taller2-fiuba",
    storageBucket: "taller2-fiuba.appspot.com",
    messagingSenderId: "916267424128",
    appId: "1:916267424128:web:65f0dc00cae85bc0f84965",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp);
