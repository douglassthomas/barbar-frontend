import React, {Component} from 'react'
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import People from '../components/People';
import ChatBubble from '../components/ChatBubble';
import {setReceive, socket, setFrom} from '../Api.js'
import {withRouter, Link} from 'react-router-dom'

class ChatOwner extends Component{

    constructor(){
        super()


        setReceive(this.receive.bind(this))

        setFrom(this.from.bind(this))
        this.state = {
            user:[],
            chat: [],
            from_id:''
        }
        
    }

    from(from){
        let recM = <Link to={{pathname:'/chat', state:{id: from}}}><button>{from}</button></Link>

        this.setState({
            from_id: [...this.state.from_id, recM]
        })
    }

    send(){
        let message = document.getElementById('text-chat').value
        document.getElementById('text-chat').value = ''
        socket.emit('newMessage', this.props.location.state.info.id, localStorage.id?localStorage.id:sessionStorage.id, message)
        // console.log('asd')
        
        let recM = <ChatBubble type='send' message={message}/>

        this.setState({
            chat: [...this.state.chat, recM]
        })
    }

    receive(message){
        let recM = <ChatBubble type='receive' message={message}/>

        this.setState({
            chat: [...this.state.chat, recM]
        })
    }

    // scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }

    // componentDidMount() {
    // this.scrollToBottom();
    // }
    
    // componentDidUpdate() {
    // this.scrollToBottom();
    // }

    // componentDidMount(){
    //     console.log(this.props.location.state.id)
    // }

    render(){
        

        let navigations = [
            {label:'Cari Kos', link:'/'},
            {label:'Promosi Iklan Anda', link:'/'},
            {label:'Masuk', link:'/'},
          ]

        let chat = this.state.from_id
        return(
            <>
                from id
                {chat}

            </>
        )
    }

}

export default withRouter(ChatOwner)
