import * as React from 'react';
import ReactDOM from 'react-dom';
import Link from '@mui/material/Link';

import {useState, useEffect} from 'react';
import {collection, query, where, doc, getDoc, getDocs, deleteDoc} from "firebase/firestore";
import {db} from '../components/fire';
import {getAuth, onAuthStateChanged} from "firebase/auth";
//table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//button
import Button from '@mui/material/Button';

//table start
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
//table end

export default function Customer() {
  const mydata = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');
  const [mail, setMail] = useState('mail...');
  const [delId, delData] = useState('del data...');

  //loginしていなかった場合は弾く処理を入れたい（P424参照）

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

          //URLを取得。Sign up or Sign in以外（直リンク等）でアクセスした場合は弾く処理を入れる
          var ref = document.referrer;
          console.log('URL = '+ ref);

          setMail(email); // メールアドレスをセット


        } else {
          console.log('error user === null');
        }

      } else {

      }
    });


    const querySnapshot = await getDocs(collection(db, "customerInfo"));

    let mydata = [];

    //すべてのテーブル情報を詰め込む
    querySnapshot.forEach((docment) => {
      console.log(docment.id, " => ", docment.data());

      if (docment.exists()) {
        console.log("customerInfo data:", docment.data());
        const doc = docment.data();
        mydata.push(
          <tr key={docment.id}>
            {/* MUIに良さげなのがありそう。探す */}
            {/* <td><input className="check" onChange={handleChange} checked={val.includes('aaa')} type="checkbox" name="lang" value={docment.id}/></td> */}
            <td><label><input className="check" onChange={handleChange} checked={val.includes(docment.id)} type="checkbox" name="lang" value={docment.id} /></label></td>
            {/* <td><input className="check" type="checkbox" /></td> */}
            <StyledTableCell align="left"><a href={'/fire/del?id=' + docment.id}>{docment.id}</a></StyledTableCell>
            <StyledTableCell align="left">{doc.name}</StyledTableCell>
            <StyledTableCell align="left">{doc.mail}</StyledTableCell>
            <StyledTableCell align="left">{doc.age}</StyledTableCell>
          </tr>
        )
      } else {
        console.log("No such info!");
      }
    });

    setData(mydata);
    setMessage('顧客情報一覧');
  }, [])

  //データを削除する処理
  useEffect(async()=> {
    console.log("実際に削除するところ Id =" + delId);
    //Idを取得できるはず。。
    await deleteDoc(doc(db, "customerInfo", delId));

  },[delId])

    //check box start
    const [val, setVal] = React.useState(['']);

    //チェックボックスに変化があったときの処理
    //const handleChange = e => {
    const handleChange = async e => {

      // change したのはいいとして、ON なのか OFF なのか判定する必要がある
      if (val.includes(e.target.value)) {
        // すでに含まれていれば OFF したと判断し、
        // イベント発行元を除いた配列を set し直す
        setVal(val.filter(item => item !== e.target.value));
      } else {
        // そうでなければ ON と判断し、
        // イベント発行元を末尾に加えた配列を set し直す
        setVal([...val, e.target.value]);
        // state は直接は編集できない
        // つまり val.push(e.target.value) はNG

        //こっちがONの処理なので、ここでIDとか取得できたらOK
        //引数でIDとか名前とか渡せないんだっけか？
        console.log('id =' + e.target.value);

        //この時点でIDは取得できているので、試しにポップアップを出して削除してみる
        let result = confirm("選択したId = "+ e.target.value +"を削除します。よろしいですか？")

        //Yes or No で切り分ける
        if(result){
          //削除処理
          console.log("削除");
          //await deleteDoc(doc(db, "cities", "DC"));
          //await deleteDoc(doc(db, e.target.value, "customerInfo"));
          //削除するIdを

          const delId = e.target.value;
          delData(delId); // 削除するIdをセット
        }
        else{
          //処理なし
          console.log("処理なし");
        }
      }
    };
    //check box end

  return (
    <div>
      {/* <Layout header="Next.js" title="Top page."> */}
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <h5 className="mb-4">アカウント：{mail}</h5>
        </div>
      {/* テーブル表示 */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Profile</StyledTableCell> */}
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">名前</StyledTableCell>
              <StyledTableCell align="left">メール</StyledTableCell>
              <StyledTableCell align="left">年齢</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="contained"><a href="./SignIn">サインイン画面に戻る</a></Button>
      <Button variant="contained"><a href="./Customer/add">顧客情報追加</a></Button>
      {/* checkbox start*/}
        {/* <label>
          <input
            type="checkbox"
            value="js"
            onChange={handleChange}
            checked={val.includes('js')}
          />
          JavaScript
        </label>
        <label>
          <input
            type="checkbox"
            value="python"
            onChange={handleChange}
            checked={val.includes('python')}
          />
          Python
        </label>
        <label>
          <input
            type="checkbox"
            value="java"
            onChange={handleChange}
            checked={val.includes('java')}
          />
          Java
        </label> */}
        <p>選択値：{val.join(', ')}</p>
      {/* checkbox end */}
    </div>
  )
}

