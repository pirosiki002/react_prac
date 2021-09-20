import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from '../../components/fire';

export default function Home() {
  const mydata = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');
 
  const mydataRef = query(collection(db, "mydata"), where("name", "==", "taro"));

//  const mydataRef = collection(db, "mydata");
  const snapshot = getDocs(mydataRef);

  useEffect(async()=> {

    const docRef = doc(db, "mydata", "2");
    const docSnap = await getDoc(docRef);
    let mydata = [];

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

    // snapshot.forEach((document)=>{
      const doc = docSnap.data();
      mydata.push(
        <tr key={docSnap.id}>
          <td><a href={'/fire/del?id=' + docSnap.id}>{docSnap.id}</a></td>
          <td>{doc.name}</td>
          <td>{doc.mail}</td>
          <td>{doc.age}</td>
        </tr>
      )
 
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }    

      setData(mydata);
      setMessage('Firebase data.');
    // })
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
