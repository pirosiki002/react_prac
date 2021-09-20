import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from '../../components/fire';

export default function Home() {
  const mydata = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');
 
  useEffect(async()=> {

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
