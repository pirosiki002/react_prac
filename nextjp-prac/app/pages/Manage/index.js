import * as React from 'react';
import ReactDOM from 'react-dom';
import Link from '@mui/material/Link';

import {useState, useEffect} from 'react';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from '../components/fire';
import {getAuth, onAuthStateChanged} from "firebase/auth";

// export default function Home() {
export default function Manage() {
  const mydata = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');
  const [mail, setMail] = useState('mail...');

  useEffect(async()=> {

    //現在ログインしているユーザーを取得する
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('uid =' + uid);

        //ユーザー情報をログで表示
        if(user !== null) {
          const displayName = user.displayName;
          const email = user.email;
          const uid = user.uid;
          console.log('Name =' + displayName);
          console.log('email =' + email);
          console.log('uid =' + uid);

          setMail(email);


        } else {
          console.log('error user === null');
        }

      } else {

      }
    });


    //ここのgetDocsをメールアドレスをキーに変えてあげればいけそう。
    const querySnapshot = await getDocs(collection(db, "mydata"));

    let mydata = [];

    querySnapshot.forEach((docment) => {
      console.log(docment.id, " => ", docment.data());

      if (docment.exists()) {
        console.log("Document data:", docment.data());
        const doc = docment.data();
        mydata.push(
          <tr key={docment.id}>
            <td><a href={'/fire/del?id=' + docment.id}>{docment.id}</a></td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        )
      } else {
        console.log("No such document!");
      }
    });

    setData(mydata);
    setMessage('Firebase data.');
  }, [])

  return (
    <div>
      {/* <Layout header="Next.js" title="Top page."> */}
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <h5 className="mb-4">{mail}</h5>
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
          <Link href="./SignIn">SignIn画面に戻る</Link>
        </div>
      {/* </Layout> */}
    </div>
  )
}

