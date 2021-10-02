import {useState, useEffect} from 'react';
import Layout from '../../components/layout';
//import firebase from 'firebase';
// import {collection, getDocs} from "firebase/firestore";
import {doc, getDoc} from "firebase/firestore";
import { useRouter } from 'next/router';
import '../../components/fire';
import {db} from '../../components/fire';
import { route } from 'next/dist/server/router';
import {getAuth} from 'firebase/auth'; //firebase9

//const db = firebase.firestore();
//const auth = firebase.auth();
const auth = getAuth(); //firebase9

export default function Info(){
  const [message, setMessage] = useState('address info');
  const [cmt, setCmt] = useState('');
  const [mydata, setMydata] = useState(null);
  // const [mydata, setMydata] = useState([]);
  const [msgdata, setMsgdata] = useState([]);
  const router = useRouter();

  //loginしてなければTop pageに戻る
  useEffect(()=>{
    if(auth.currentUser == null) {
      router.push('/address');
    }
  },[])

  // input field
  const onChangeCmt = ((e)=> {
    setCmt(e.target.value);
  })

  //message
  const doAction = ((e)=> {
    const t = new Date().getTime();
    const to = {
      comment:'To: ' + cmt,
      time:t
    }
    const from = {
      comment:'From: ' + cmt,
      time:t
    }

    //自身のアドレス内にメッセージを追加
      //相手のアドレス内にメッセージを追加
        //相手のアドレス内のflagを変更
  })

  //back to top
  const goBack = (e)=> {
    router.push('/address');
  }

  //アドレスデータとメッセージを取得し表示
  //※とりあえずアドレスデータを取得して表示できればOKとします
  //fire/index.js に似たような処理がある！
  // useEffect(()=>{
  //   if(auth.currentUser != null){
      //db.collection('address')
      //  .doc(auth.currentUser.email)
      //  .collection('address)
      //  .doc(router.query.id).get()
      //  .then((snapshot)=> {
        // setMydata(snapshot.data())
      // })

    // }
  // }, [message])

    useEffect(async()=>{
      if(auth.currentUser != null) {
        // const snapshot = await getDocs(collection(db, "address", auth.currentUser.email, "address"));  
        // const data = [];
        // snapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   //2人分のデータは取れている
        //   console.log(doc.id, " => ", doc.data());
        //   //ドキュメントデータを配列に詰め込む
        //   data.push(doc.data());
        // });
        // setMydata(data);
        //ドキュメント１つでやってみる
        const docRef = doc(db, "address", auth.currentUser.email, "address", "QN5G6piMeIiyoJbyPGTw");
        const docSnap = await getDoc(docRef);

        setMydata(docSnap.data());

      }
      else{
        setMessage("no data");
      }
    }, [message])

  return (
    <div>
      <Layout header="Next.js" title="Info & messages.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div>
              <div>Name: {mydata != null ? mydata.name:'null'}</div>
              <div>Mail: {mydata != null ? mydata.mail:'null'}</div>
              <div>Tel: {mydata != null ? mydata.tel:'null'}</div>
              <div>Memo: {mydata != null ? mydata.memo:'null'}</div>
            </div>
            <hr/>
            {/* message disp */}
          </div>
          <button onClick={goBack} className="btn">
            Go Back
          </button>
        </div>
        {/* <ul className="list-group">
          {msgdata}
        </ul> */}
      </Layout>
    </div>
  )


}


