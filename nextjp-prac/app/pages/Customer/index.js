import * as React from 'react';
import ReactDOM from 'react-dom';
import Link from '@mui/material/Link';

import {useState, useEffect} from 'react';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
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
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Mail</StyledTableCell>
              <StyledTableCell align="left">Age</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="contained"><a href="./SignIn">サインイン画面に戻る</a></Button>
      <Button variant="contained"><a href="./Fire/add">顧客情報追加</a></Button>
    </div>
  )
}
