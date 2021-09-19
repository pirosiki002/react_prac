import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

const MoneyBook = () => {

  const books = [
    {date: "1/1", item: "お年玉", amount: 10000},
    {date: "1/3", item: "ケーキ", amount: -500},
    {date: "2/1", item: "小遣い", amount: 3000},
    {date: "2/5", item: "マンガ", amount: -700}
  ]

  return (
    <div>
      <h1>小遣い帳</h1>
      <table className="book">
        <thead>
          <tr><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          <MoneyBookItem book={books[0]} />
          <MoneyBookItem book={books[1]} />
          <MoneyBookItem book={books[2]} />
          <MoneyBookItem book={books[3]} />
        </tbody>
      </table>
    </div>
  )
}

const MoneyBookItem = (props) => {
  const {date, item, amount} = props.book;
    return (
      <tr>
        <td>{date}</td>
        <td>{item}</td>
        <td>{amount >= 0 ? amount : null}</td>
        {/* テキストは-amountとなっているが、books配列にて-で設定済のため不要。 */}
        <td>{amount < 0 ? amount : null}</td>
      </tr>
    )
}

MoneyBookItem.prototype = {
  book: PropTypes.object.isRequired
}

ReactDOM.render(
  <MoneyBook />,
  document.getElementById('root')
);
