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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

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

  //データを表示する処理
  useEffect(async()=> {

    //現在ログインしているユーザーを取得する
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      //ユーザー情報をログで表示
      if(user !== null) {
        const email = user.email;

        //URLを取得。Sign up or Sign in以外（直リンク等）でアクセスした場合は弾く処理を入れる
        var ref = document.referrer;
        console.log('URL = '+ ref);

        setMail(email); // メールアドレスをセット

      } else {
        console.log('error user === null');
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
            {/* <Checkbox onChange={handleChange} checked={val.includes(docment.id)} type="checkbox" name="lang" value={docment.id} /> */}
            <td><label><input className="check" onChange={handleChange} checked={val.includes(docment.id)} type="checkbox" name="lang" value={docment.id} /></label></td>
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
    const handleChange = e => {
    //const handleChange = async e => {

      //この時点でIDは取得できているので、試しにポップアップを出して削除してみる
      let result = confirm("選択したId = "+ e.target.value +"を削除します。よろしいですか？")

      if(result){
        console.log("削除");
        const delId = e.target.value;
        delData(delId); // 削除するIdをセット

        //リアルタイム画面更新の暫定対策（リロード）
        location.reload();
      }
      else{
        //処理なし
        console.log("処理なし");
      }
    };
    //check box end

    //search start
    const buttonClick = e =>{
      alert("検索機能は未実装です");
    };
    //search end

  return (
    <div>
      {/* <Layout header="Next.js" title="Top page."> */}
        <div className = "search">
          <TextField label="キーワードを入力" id="outlined-size-small" defaultValue="" size="small"/>
          <Button variant="contained" onClick={buttonClick}>検索</Button>
        </div>
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
    </div>
  )
}
