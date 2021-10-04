import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      counter:0,
      msg:'count start!',
      flg:true,
    }
   this.doAction = this.doAction.bind(this);
  }

  doAction(e){
    this.setState({
      counter: this.state.counter + 1,
      msg: '*** count: ' + this.state.counter + ' ***',
      flg: !this.state.flg
    })
  }

  render(){
    return <div>
      <h1 className="bg-primary text-white display-4">React</h1>
      <div className="container">
        <p className="subtitle">Count number.</p>
        {this.state.flg ?
          <div className="alert alert-primary text-right">
            <p className="h5">{this.state.msg}</p>
          </div>
        :
          <div className="alert alert-warning text-left">
            <p className="h5">{this.state.msg}です。</p>
          </div>      
        }

        <div className="text-center">
          <button className="btn btn-primary" onClick={this.doAction}>Click</button>
        </div>
      </div>
    </div>
  }
}

export default App;
