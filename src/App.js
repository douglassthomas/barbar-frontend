import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import FloatLogin from './components/FloatLogin';
import Login from './pages/Login';
import Cari from './pages/Cari';
import NavBar from './containers/NavBar'
import Register from  './pages/Register.js'
import test from './pages/test';
import Signin from './pages/Signin';
import {connect,socket } from './Api.js'

import Chat from './containers/Chat.js'
import ProfilePage from './pages/ProfilePage';
import axios from 'axios'
import EditProfile from './pages/EditProfile';
import SearchCover from './components/SearchCover';
import Detail from './pages/Detail';
import Loading from './containers/Loading';
import HistoryPage from './pages/HistoryPage'
import FollowingPage from './pages/FollowingPage';
import OwnerManage from './pages/OwnerManage';
import ChatOwner from './pages/ChatOwner';
import ReviewPage from './pages/ReviewPage';
import LoginAdmin from './pages/LoginAdmin';
import AdminManage from './pages/AdminManage';
import PostPage from './pages/PostPage';
import Post from './pages/Post';
import Premium from './pages/Premium';
import Checkout from './pages/Checkout';
import Owner from './pages/Owner';
import HistoryPremium from './pages/HistoryPremium';


class App extends Component {
  constructor(){
    super();

    this.state={
      mode:'desktop',
      navstick:false,
      login:{
        status: false,
        id:'',
        name:'Jodie'
      },
      loaded:false,
      receiveChat:'asd',
      loadMap:null
    }

    connect();

    axios.post('http://localhost:8000/api/test', {
          token: window.localStorage.token? window.localStorage.token:
                  window.sessionStorage.token
      }).then(
          res=>{
            console.log(res.data.status)

            if(res.data.status == 'error'){
              localStorage.clear()
              sessionStorage.clear()
            }
            this.setState({
                loaded:true
            })
          }
      )
  }

  send(){
    socket.emit('newMessage', '044155a5-b4e3-4fac-a001-04af4bedcf85', '1', 'hellllooooooo')
  }

  login(status, id, name, email, type){
    this.setState({
      login:{
        status:status,
        id:id,
        name:name,
        email: email,
        type:type
      }
    })
  }

  checkStorage(){
    if(window.localStorage.token && window.localStorage.name){
      this.login(true, window.localStorage.id, window.localStorage.name, window.localStorage.email, window.localStorage.type);
      // window.location.href='/'
    }else if(window.sessionStorage.token && window.sessionStorage.name){
      this.login(true, window.sessionStorage.id, window.sessionStorage.name, window.sessionStorage.email, window.sessionStorage.type);
      // window.location.href='/'
    }else{
      this.login(false, '', '', '')
      if(this.state.status == false){
        window.location.reload()
      }
      // window.location.reload()

      // if(window.location.pathname!='/' && 
      //     window.location.pathname!='/cari' &&
      //     window.location.pathname!='/login' &&
      //     window.location.pathname!='/signin' &&
      //     window.location.pathname!='/register'){
      //   window.location.href='/'
      // }
      // window.location.href='/'
    }


  }

  changeMode(){
    if(window.innerWidth<500){
      this.setState({
        mode:'mobile'
      })
    }else if(window.innerWidth<1100){
      this.setState({
        mode:'tablet'
      })
    }
    else{
      this.setState({
        mode:'desktop'
      })
    }
  }

  componentDidMount(){
    this.changeMode();
    this.checkStorage()

    window.addEventListener('resize', ()=>{
      this.changeMode();
    })
  }

  componentDidUpdate(){
    // if (this.state.loaded==true) {
    // // document.addEventListener('DOMContentLoaded', this.loadMap);
    //   this.state.loadMap()
    // }
  }

  render() {
    // console.log(window.localStorage.token)
    let loading = this.state.loaded?'':<Loading/>

    let navigations = this.state.login.status==false?[
      {label:'Cari Kos', link:'/'},
      {label:'Promosi', link:'/post-page'},
      {label:'Masuk', link:'/'},
    ]
    : this.state.login.type ==1?
    [
      {label:'Cari Kos', link:'/'},
      {label:'Promosi', link:'/post-page'},
      {label:this.state.login.name, profile:'/profile', chat:'/history'},
    ]:
    this.state.login.type==0?[
      {label:'Cari Kos', link:'/'},
      {label:'Promosi Iklan Anda', link:'/'},
      {label:this.state.login.name, link:'/admin-manage', profile:'/profile'}
    ]:
    [
      {label:'Cari Kos', link:'/'},
      {label:'Promosi', link:'/post-page'},
      {label:this.state.login.name, link:'/owner-manage', profile:'/profile', chat:'/chat'}
    ]

    return (
      <BrowserRouter>
          
            {loading}

            <Route path='/' component={()=><Home loaded={this.state.loaded} socket={this.send} apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/login' component={()=><Login apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/cari' component={()=><Cari apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/register' component={()=><Register apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/signin' component={()=><Signin apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/chat' component={()=><Chat apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/chat-owner' component={()=><ChatOwner apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/profile' component={()=><ProfilePage nav={navigations} mode={this.state.mode} apptis={this}/>} exact/>
            <Route path='/profile/edit-profile' component={()=><EditProfile apptis={this} nav={navigations} mode={this.state.mode}/>} exact/>
            <Route path='/detail/:id' component={()=><Detail mode={this.state.mode} nav={navigations} apptis={this} login={this.state.login}/>} exact/>
            <Route path='/detail/reviews/:id' component={()=><ReviewPage mode={this.state.mode} nav={navigations} apptis={this}/>} exact/>
            <Route path='/history' component={()=><HistoryPage apptis={this} mode={this.state.mode} nav={navigations} login={this.state.login}/>} exact/>
            <Route path='/profile/following' component={()=><FollowingPage apptis={this} mode={this.state.mode} nav={navigations} login={this.state.login}/>} exact/>
            <Route path='/owner-manage' component={()=><OwnerManage apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/login-admin' component={()=><LoginAdmin apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/admin-manage' component={()=><AdminManage apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/post-page/:key' component={()=><PostPage apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/post-page' component={()=><PostPage apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/post/:id' component={()=><Post apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/premium' component={()=><Premium apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/checkout' component={()=><Checkout apptis={this} mode={this.state.mode} nav={navigations} login={this.state.login}/>} exact/>
            <Route path='/owner/:id' component={()=><Owner apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>
            <Route path='/history-premium' component={()=><HistoryPremium apptis={this} mode={this.state.mode} nav={navigations}/>} exact/>

            {/* <Route path='/history' component={()=><HistoryPage apptis={this} mode={this.state.mode}/>} exact/> */}
            

      </BrowserRouter>

    );
  }
}

export default App;
