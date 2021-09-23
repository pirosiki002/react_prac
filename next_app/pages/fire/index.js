import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
//import firebase from 'firebase';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'; //firebase9
import {collection, getDocs} from "firebase/firestore";
import {db} from '../../components/fire';

//const auth = firebase.auth();
//const provider = new firebase.auth.GoogleAuthProvider();
const auth = getAuth(); //firebase9
const provider = new GoogleAuthProvider(); //firebase9

export default function Home() {
  const [message, setMessage] = useState('wait...');

  useEffect(async()=> {
    // auth.signInWithPopup(provider).then(result=> {
    //   setMessage('logined:' + result.user.displayName)
    // })
    signInWithPopup(auth, provider).then((result) => {
      setMessage('logined:' + result.user.displayName);
    }).catch((error) => {
      //エラー処理
    });
  }, []);

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <p className="h6 text-left">
            uid: {auth.currentUser != null ? auth.currentUser.uid : ''}<br/>
            displayName: {auth.currentUser != null ? auth.currentUser.displayName : ''}<br/>
            email: {auth.currentUser != null ? auth.currentUser.email : ''}<br/>
            phoneNumber: {auth.currentUser != null ? auth.currentUser.phoneNumber : ''}<br/>
          </p>
        </div>
      </Layout>
    </div>
  )  
}
