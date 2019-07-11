import React, {Component} from 'react'
import NavBar from './NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import People from '../components/People';
import ChatBubble from '../components/ChatBubble';
import {setReceive, socket, setGetRead} from '../Api.js'
import {withRouter, Redirect} from 'react-router-dom'
import Axios from 'axios';

class Chat extends Component{

    constructor(){
        super()


        setReceive(this.receive.bind(this))
        setGetRead(this.getRead.bind(this))

        this.state = {
            user:[],
            chat: [],
            peopleChat:[],
            name:'',
            id:'',
            chatListMobile:false,
            udahread:false
        }
        
    }

    getRead(){
        // Axios.post('http://localhost:8000/api/getRead', {
        //     to_id: this.state.id,
        //     from_id: localStorage.id?localStorage.id:sessionStorage.id
        // }).then(res=>{
        //     this.setState({
        //         read: res.data
        //     })
            
        // })
        // alert('UDAH DIREAD BOY')

        Axios.post('http://localhost:8000/api/getAllChat', {
            to_id: this.state.id,
            from_id: localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                chat: [],
                read: res.data.read
            })

            for(const c of res.data.chat){
                var myid = localStorage.id?localStorage.id:sessionStorage.id
                if(c.from_id == myid){
                    let recM = <ChatBubble type='send' 
                    message={c.contents} 
                    read={this.state.read} 
                    chat_id={parseInt(c.chat_id)}
                    tis = {this}
                    />

                    this.setState({
                        chat: [...this.state.chat, recM]
                    })
                }else{
                    let recM = <ChatBubble type='receive' message={c.contents}/>

                    this.setState({
                        chat: [...this.state.chat, recM]
                    })
                }
            }
        })
    }

    send(){
        let message = document.getElementById('text-chat').value
        document.getElementById('text-chat').value = ''
        socket.emit('newMessage', this.state.id, localStorage.id?localStorage.id:sessionStorage.id, message)
        // console.log('asd')
        
        Axios.post('http://localhost:8000/api/sendChat',{
            to_id:this.state.id,
            from_id:localStorage.id?localStorage.id:sessionStorage.id,
            contents:message
        }).then(res=>{

        })

        let recM = <ChatBubble type='send' message={message} read={this.state.read} 
        chat_id={this.state.chat.length+1} tis={this}/>

        this.setState({
            chat: [...this.state.chat, recM]
        })
    }

    receive(message){
        let recM = <ChatBubble type='receive' message={message} read={this.state.read} 
        chat_id={this.state.chat.length+1}/>

        this.setState({
            chat: [...this.state.chat, recM],
            udahread:false
        })
    }

    getAllChat(to_id, user){
        this.setState({
            name:user.name,
            profpic:user.profile_pic,
            id:to_id
        })

        Axios.post('http://localhost:8000/api/getAllChat', {
            to_id: to_id,
            from_id: localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                chat: [],
                read: res.data.read
            })

            for(const c of res.data.chat){
                var myid = localStorage.id?localStorage.id:sessionStorage.id
                if(c.from_id == myid){
                    let recM = <ChatBubble type='send' 
                    message={c.contents} 
                    read={this.state.read} 
                    chat_id={parseInt(c.chat_id)}
                    tis = {this}
                    />

                    this.setState({
                        chat: [...this.state.chat, recM]
                    })
                }else{
                    let recM = <ChatBubble type='receive' message={c.contents}/>

                    this.setState({
                        chat: [...this.state.chat, recM]
                    })
                }
            }
        })
    }

    triggerViewChat(){
        console.log('a')
    }

    getChatList(){
        Axios.post('http://localhost:8000/api/getChatList', {
            id: localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                peopleChat: []
            })

            for(const c of res.data){
                let recM = 
                <span onClick={()=>this.getAllChat(c.user.id, c.user)}>
                    <People 
                    type='panel' 
                    peoplename={c.user.name} 
                    message={c.last_chat.contents}
                    profile_pic={c.user.profile_pic}/>
                </span>

                this.setState({
                    peopleChat: [...this.state.peopleChat, recM]
                })
            
            }
        })
    }

    scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    componentDidMount() {
    this.scrollToBottom();
    // this.getAllChat()
    let type = localStorage.type?localStorage.type:sessionStorage.type?sessionStorage:null
    if(type==null){
        this.props.history.replace('/')
    }


    this.getChatList()
    
    let a = this.props.location.state?this.getAllChat(this.props.location.state.user.id, this.props.location.state.user):''
    
    document.getElementById('chat-window').addEventListener('mouseover', function () {
        // console.log(this.state.id)
        if(this.state.udahread==false){
            let a = this.state.id!=''?socket.emit('read', this.state.id):''
            Axios.post('http://localhost:8000/api/read', {
                to_id: this.state.id,
                from_id: localStorage.id?localStorage.id:sessionStorage.id
            }).then(res=>{
                this.setState({
                    udahread:true
                })
            })
        }
        
    }.bind(this))

    }
    
    componentDidUpdate() {
    this.scrollToBottom();
        
    }

    

    render(){
        

        let navigations = [
            {label:'Cari Kos', link:'/'},
            {label:'Promosi Iklan Anda', link:'/'},
            {label:'Masuk', link:'/'},
          ]

        let chat = this.state.chat
        let peopleChat = this.state.peopleChat
        let chatpage = this.props.mode != 'mobile'?
        <>
                <div className='navstick' style={{zIndex: 1000, position:'relative'}}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode}/>
                </div>
                {/* <input id=''></input> */}
                
                <div className='chat-panel'>
                    {peopleChat}
                </div>
                <div id='chatbox' className='chat-box'>
                    <div className="chat-head">
                        <People type='head' peoplename={this.state.name} profile_pic={this.state.profpic}/>
                    </div>
                    <div id='chat-window' className="chat">
                        
                        {chat}


                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>


                    </div>
                    <div className="chat-foot">
                        <textarea id='text-chat' className="chat-textarea"></textarea>
                        <button onClick={this.send.bind(this)} className="btnIjo-selected send-btn">Send</button>
                    </div>
                </div>

            </>
            :
            <>
                <div className='navstick' style={{zIndex: 1000, position:'relative'}}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode}/>
                </div>

                    <button
                    style={this.state.chatListMobile?{position:'absolute',
                    left:0,
                    marginTop:'60px',
                    marginLeft:'300px',
                    zIndex:1000
                    }
                    :
                    {position:'absolute',
                    left:0,
                    marginTop:'60px',
                    zIndex:1000
                    }}
                    onClick={()=>{this.setState({chatListMobile:!this.state.chatListMobile})}}
                    className='btnOrange'> </button>

                    {this.state.chatListMobile?<div style={{zIndex:1000}} className='chat-panel'>
                        {peopleChat}
                    </div>:''}

                    <div id='chatbox' className='chat-box'>
                        <div className="chat-head">
                            <People type='head' peoplename={this.state.name} profile_pic={this.state.profpic}/>
                        </div>
                        <div id='chat-window' className="chat">
                            
                            {chat}


                            <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>


                        </div>
                        <div style={{zIndex:-100}} className="chat-foot">
                            <textarea style={{width:'100%'}} id='text-chat' className=""></textarea>
                            <button onClick={this.send.bind(this)} className="btnIjo-selected send-btn">Send</button>
                        </div>
                    </div>
            </>
        
        
        
        
        return(
            <>
            {chatpage}
            </>
        )
    }

}

export default withRouter(Chat)
