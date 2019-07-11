import React, {Component} from 'react'
import Axios from 'axios';
import BubblePop from './BubblePop';

class Review extends Component{

    constructor(){
        super() 
        this.state={
            children:[],
            finish:false,
            message:''
        }
    }

    showLogin(){
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow='auto'
    }

    goReply(id){
        if(document.getElementById(id)){
            document.getElementById(id).style.display=''
            var idbtn = id.split('_')[0];
            console.log(idbtn)
            document.getElementById(idbtn).style.display = 'none'
        }
    }

    goCancel(id){
        if(document.getElementById(id)){
            document.getElementById(id).style.display='none'
            var idbtn = id.split('_')[0];
            document.getElementById(idbtn).style.display = ''
        }
    }

    sendReview(){
        var property_id = this.props.info.id
        Axios.post('http://localhost:8000/api/insertReview',{
            token:window.localStorage.token?window.localStorage.token:window.sessionStorage.token,
            property_id:property_id,
            contents:document.getElementById('txt-review').value,
            user_id:window.localStorage.id?window.localStorage.id:window.sessionStorage.id
        }).then(res=>{
            alert(res.data)
            document.getElementById('txt-review').value = ''
        })
    }

    replyReview(parent_id){
        var property_id = this.props.info.id
        var inputid = parent_id+'_txt'

        Axios.post('http://localhost:8000/api/insertReview',{
            token:window.localStorage.token?window.localStorage.token:window.sessionStorage.token,
            property_id:property_id,
            contents:document.getElementById(inputid).value,
            user_id:window.localStorage.id?window.localStorage.id:window.sessionStorage.id,
            parent_id:parent_id
        }).then((res)=>{
            
            
            this.setState({
                message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
            document.getElementById(inputid).value = ''
        }).catch(err=>{
            this.setState({
                message:<><BubblePop message={err.response.message?err.response.message:'login first'} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
        })
    }

    async prosesChild(r){
        let tagged = <>
        <Review tis={this.props.tis} reload={this.props.reload.bind(this.props.tis)} info={this.props.info} data={r} child={r.children}/>
        </>
        await tagged
        var childrens = [...this.state.children, tagged]
        await childrens
        this.setState({
            children:childrens
        })
    }

    async componentDidMount(){
        // console.log(this.props.child)
        

        // window.addEventListener('scroll',()=>{
            // if(this.props.tis.loaded == true){
                if(this.props.child!=null){
                    this.setState({
                        children:[]
                    })
        
        
                    if(this.state.finish==false){
                        for(const r of this.props.child){
                            // console.log(r)
                            let a = this.prosesChild(r)
                            await a
                        }
                    }    
               }
             
            // }
        // })
        // console.log(this.state.children.length)
    }    

    render(){
        let child = this.state.children
        let message = this.state.message
        return(
            <>
            <div style={{
                paddingLeft: '20px',
                fontSize: '14px'
            }}>
                <div style={{ color: 'green', padding: '2px' }}>{this.props.data.user_id.name}</div>
                <div style={{ color: 'dimgray', padding: '2px' }}>{this.props.data.contents}</div>
                <button id={this.props.data.id} onClick={() => { this.goReply(this.props.data.id+'_input') }}>reply</button>
                <div id={this.props.data.id+'_input'} style={{ display: 'none' }}>
                    <input id={this.props.data.id+'_txt'} style={{ width: '30%', marginRight: '20px' }} type="text" className="btnIjo"></input>
                    <button onClick={()=>{this.replyReview(this.props.data.id)}} className='btnIjo-selected'>SEND</button>
                    <button className='btnOrange' onClick={() => { this.goCancel(this.props.data.id+'_input') }}>Cancel</button>
                </div>
                {child}
                {message}
            </div>
            </>
        )

    }

}

export default Review