import React, { Component } from 'react'
import css from './MenuContent.css';
import * as Puppteer from '../../puppeteer/util';
import localStorage from 'local-storage';
import * as common from '../../utils/common';
import Spinner from 'react-spinner-material';

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.addAccount = this.addAccount.bind(this);
    this.turnOffNoti = this.turnOffNoti.bind(this);
    this.deleteAcc = this.deleteAcc.bind(this);
    this.loaded = this.loaded.bind(this);
    this.state = {listAccount: Puppteer.listAccount,loadAcc : true,notyStatus:'none',notify:''};
  }

  turnOffNoti(){
    this.setState({...this.state,notyStatus:'none'})
  }

  deleteAcc(username){
    console.log(username);
    this.setState({...this.state,
      listAccount:this.state.listAccount.filter((data) => ! (data.username === username) 
      )});
  }
  loaded(){
    return (
      <div className="menu">
        {this.state.listAccount.map(data => <div className="menu-item" key={data.username}>
          <a
            style={{width: '100%',
            display: 'inline-block'}}
            target="_blank">
            {data.name}
            <button style={{float:"right"}} onClick ={() => this.deleteAcc(data.username)}>Xoá</button>
            </a>    
          </div>)}
          <div className="menu-item">
            <input className="username col-md-6" placeholder="username" ref="username"></input>
            <input className="password col-md-6" placeholder="password" ref="password" type="password"></input>
          <button className="login-submit" onClick={this.addAccount}>ADD</button>
        </div>
        <div className="notification" style={{display:this.state.notyStatus,width:'100%',marginTop:'12px',border: '2px solid #2768ca' }}>
          <p style={{float:'left',marginLeft:'12px'}}>{this.state.notify}</p>
          <button style={{float:'right',marginRight:'12px'}} onClick={this.turnOffNoti}>OK</button>
        </div>
      </div>
    );
  }

  async addAccount(){
    console.log(this.refs.username.value);
    var accounts = JSON.parse(localStorage.get('account'));
    var newAccount = [this.refs.username.value, this.refs.password.value];
    console.log(accounts);
    if(!accounts){
      accounts = {};
      accounts.list = [];
    }
    const checkExist = common.checkAccountExist(accounts.list,newAccount);
      if(checkExist){
        this.setState({...this.state,loadAcc:false,notyStatus:'inline-block',notify:'Tai khoan da dang nhap'});
        console.log("tai khoan da ton tai");
      }else{
        this.setState({listAccount : Puppteer.listAccount,loadAcc:true});
        const loginSuccess = await Puppteer.login(this.refs.username.value, this.refs.password.value);
        if(loginSuccess){
          accounts.list.push(newAccount);
          localStorage.set('account',JSON.stringify(accounts));
          const test = JSON.parse(localStorage.get('account'));
          console.log(test);
        }else{
          this.setState({...this.state,loadAcc:false,notyStatus:'inline-block',notify:'Tài khoản hoặc mật khẩu sai'});
        }
      }
      this.setState({listAccount : Puppteer.listAccount,loadAcc:false});
      this.refs.username.value='';
      this.refs.password.value='';
  }
  async componentWillMount(){
    const accounts = JSON.parse(localStorage.get('account'));
    console.log(accounts);
    if(accounts){
      const result = await Puppteer.loginMultiAcc(accounts.list);
      this.setState({listAccount : Puppteer.listAccount,loadAcc:false});
      console.log(result);
    }else{
      this.setState({listAccount : Puppteer.listAccount,loadAcc:false});
    }
  }
  render() {
    return (
      <div>
        {this.state.loadAcc? notLoad() : this.loaded()}
      </div>
    )
  }
}

const notLoad = () => {
  return (
    <div>
    <div className="spiner">
      <Spinner size={70} spinnerColor={"#2768ca"} spinnerWidth={2} visible={true} />
      <h5>Đang load các account...</h5>
    </div>
    </div>
  )
}
MenuContent.PropTypes = {
  closeCallback: React.PropTypes.func.isRequired
}



export default MenuContent
