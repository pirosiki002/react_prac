import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth'; //firebase9
import {collection, getDocs} from "firebase/firestore";
import {db} from '../../components/fire';

//const db = firebase.firestore();
const auth = getAuth(); //firebase9
const provider = new GoogleAuthProvider(); //firebase9


//auth.signOut(); //☆彡ログアウトする
//const [soMessage, soSetMessage] = useState('sign out ready...');
signOut(auth).then(() => {
  // Sign-out successful.
  // soSetMessage('Sign-out successful.');
  console.log('Sign-out successful.');
}).catch((error) => {
  // An error happened.
  // soSetMessage('Sign-out execing.');
  console.log('Sign-out execing.');
});


export default function Home() {
  const mydata = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');

  useEffect(()=> {
    signInWithPopup(auth, provider).then((result) => {
      setMessage('logined:' + result.user.displayName);
    }).catch((error) => {
      //エラー処理
      setMessage('not logined...');
    });
  }, []);

  useEffect(async()=>{
    if(auth.currentUser != null) {
      const querySnapshot = await getDocs(collection(db, "mydata"));

      querySnapshot.forEach((document) => {
        const doc = document.data();
        mydata.push(
          <tr key={document.id}>
            <td><a href={'/fire/del?id=' + document.id}>{document.id}</a></td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        )
      })
      setData(mydata);
    }
    else{
      mydata.push(
        <tr key="1"><th colSpan="4">can't get data.</th></tr>
      )
    }
  }, [message])


  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <table className="table bg-white text-left">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )  
}
