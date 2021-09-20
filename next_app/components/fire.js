// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBv31NL770BxdW-kLPG7W55O9bsfM64x94",
//   authDomain: "pirosiki-react.firebaseapp.com",
//   databaseURL: "https://pirosiki-react-default-rtdb.firebaseio.com",
//   projectId: "pirosiki-react",
//   storageBucket: "pirosiki-react.appspot.com",
//   messagingSenderId: "478369498635",
//   appId: "1:478369498635:web:099c31110f79af4478e90e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
//   apiKey: "AIzaSyBv31NL770BxdW-kLPG7W55O9bsfM64x94",
//   authDomain: "pirosiki-react.firebaseapp.com",
//   databaseURL: "https://pirosiki-react-default-rtdb.firebaseio.com",
//   projectId: "pirosiki-react",
//   storageBucket: "pirosiki-react.appspot.com",
//   messagingSenderId: "478369498635",
//   appId: "1:478369498635:web:099c31110f79af4478e90e"

    apiKey: 'AIzaSyBv31NL770BxdW-kLPG7W55O9bsfM64x94',
    authDomain: 'pirosiki-react.firebaseapp.com',
    databaseURL: 'https://pirosiki-react-default-rtdb.firebaseio.com',
    projectId: 'pirosiki-react',
    storageBucket: 'pirosiki-react.appspot.com',
    messagingSenderId: '478369498635',
    appId: '1:478369498635:web:099c31110f79af4478e90e'
}
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp

export const db = getFirestore()

//--------------text----------------------------

// import firebase from 'firebase';
// import firebase from 'firebase/firestore';
// import firebase from 'firebase/app';

// //☆彡各プロジェクトの設定を記述
// const firebaseConfig = {
//   apiKey: "AIzaSyBv31NL770BxdW-kLPG7W55O9bsfM64x94",
//   authDomain: "pirosiki-react.firebaseapp.com",
//   databaseURL: "https://pirosiki-react-default-rtdb.firebaseio.com",
//   projectId: "pirosiki-react",
//   storageBucket: "pirosiki-react.appspot.com",
//   messagingSenderId: "478369498635",
//   appId: "1:478369498635:web:099c31110f79af4478e90e"
// }

// if (firebase.apps.length == 0) {
//   firebase.initializeApp(firebaseConfig);
// }