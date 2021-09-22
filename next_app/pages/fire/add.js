import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import {collection, addDoc} from 'firebase/firestore'; //add
import { useRouter } from 'next/router';
import {db} from '../../components/fire';
//import useSWR from 'swr';

//const db = firebase.firestore();

export default function Add() {
  const [message, setMessage] = useState('add data');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [age, setAge] = useState(0);
  const router = useRouter();

  const onChangeName = ((e)=> {
    setName(e.target.value);
  });

  const onChangeMail = ((e)=>{
    setMail(e.target.value);
  });

  const onChangeAge = ((e)=>{
    setAge(e.target.value);
  });

  const doAction = (async(e)=> {


    // const ob = {
    //   name:name,
    //   mail:mail,
    //   age:age
    // }
    // db.collection('mydata').add(ob).then(ref=> {
    //   router.push('/fire');
    // })

    try {
      const docRef = await addDoc(collection(db, "mydata"), {
        name:name,
        mail:mail,
        age:age
      });
      console.log("Doc id:", docRef.id);
      router.push('/fire');

    } catch (e) {
      console.error("Errror", e);
    }


  })

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" onChange={onChangeName} className="form-control" />
            </div>
            <div className="form-group">
              <label>Mail:</label>
              <input type="text" onChange={onChangeMail} className="form-control" />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type="text" onChange={onChangeAge} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">Add</button>
        </div>
      </Layout>
    </div>
  )
}