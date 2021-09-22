import { useState, useEffect } from "react";
import Layout from '../../components/layout';
import {doc, getDoc, deleteDoc} from "firebase/firestore";
import {useRouter} from 'next/router';
import {db} from '../../components/fire';

export default function Delete(props) {
  const[message, setMessage] = useState('wait');
  const[data, setData] = useState(null);
  const router = useRouter();

  useEffect(async()=>{
    if(router.query.id != undefined) {
      setMessage('Delete id =' + router.query.id);
      // db.collection('mydata').doc(router.query.id).get().then(ob=>{
      //   setData(ob.data());
      // })
      const docRef = doc(db, "mydata", router.query.id);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
      // setData(docRef.data()); // こっちだとエラー

    }
    else{
      setMessage(message + '.');
    }
  }, [message])

  const doAction = async(e)=> {
    // db.collection('mydata').doc(router.query.id).delete().then(ref=>{
    //   router.push('/fire');
    // })

    await deleteDoc(doc(db, "mydata", router.query.id));
    router.push('/fire');

  }

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-left">
            Name: {data != null ? data.name : '...'}<br/>
            Mail: {data != null ? data.mail : '...'}<br/>
            Age: {data != null ? data.age : '...'}<br/>
          </pre>
          <button onClick={doAction} className="btn btn-primary">
            Delete
          </button>
        </div>
      </Layout>
    </div>
  )
}
