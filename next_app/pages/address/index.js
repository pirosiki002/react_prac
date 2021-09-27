import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
//import firebase from 'firebase';
import {db} from '../../components/fire';
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth'; //firebase9

const auth = getAuth(); //firebase9
const provider = new GoogleAuthProvider(); //firebase9

//sign out 
signOut(auth).then(() => {
  console.log('Sign-out successful.');
}).catch((error) => {
  console.log('Sign-out execing.');
});

export default function Index() {
  let addresses = [];
  const [user, setUser] = useState(null);
  const [data, setData] = useState(addresses);
  const [message, setMessage] = useState('please login...');
  const router = useRouter();

  //login
  const login = ()=> {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user.displayName);
      setMessage('logined:' + result.user.displayName);
    }).catch((error) => {
      setUser('NONE');
      setMessage('not logined.');
    });
  }

  //logout
  const logout = ()=>{
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
    }).catch((error) => {
      console.log('Sign-out execing.');
    });
    
    setUser(null);
    addresses = [];
    setData(addresses);
    setMessage('logout...');
  }

  //Click login desp
  const doLogin = (e)=> {
    if(auth.currentUser == null) {
      login();
    } else {
      logout();
    }
  }
  
  //add
  const doAction = (e)=> {
    router.push('/address/add');
  }

  //address page
  const doLink = (e)=>{
    const id = e.target.id;
    router.push('/address/info?id=' + id);
  }

  //get and disp address data
  useEffect(()=>{
    if(auth.currentUser != null){
      setUser(auth.currentUser.displayName);
      setMessage(auth.currentUser.displayName + 'さんの登録アドレス');

      db.colloction('address')
        .doc(auth.currentUser.email)
        .colloction('address').get()
        .then((snapshot)=>{
          snapshot.forEach((document)=> {
            const doc = document.data();
            addresses.push(
              <li className="list-group-item list-group-item-action p-1" onClick={doLink} id={document.id}>
                {doc.flag ? '√' : ''}{doc.name} ({doc.mail})
              </li>
            )
          })
          setData(addresses);
        })
    }
    else{
      addresses.push(
        <li key="1">can't get data.</li>
      )
    }
  }, [message])

  return (
    <div>
      <Layout header="Next.js" title="Address book.">
        <div className="alert alert-primary text-center">
          <h6 className="text-right" onClick={doLogin}>
            LOGINED:{user}
          </h6>
          <h5 className="mb-4">{message}</h5>
          <ul className="list-group">
            {data}
          </ul>
          <hr/>
          <button className="btn btn-primary" onClick={doAction}>Add address</button>
        </div>
      </Layout>
    </div>
  )
}
