import React, {Component} from 'react'
import axios from 'axios'
import {Link, BrowserRouter} from 'react-router-dom'
import Register from '../pages/Register.js'

class BubblePop extends Component{
    constructor(){
        super();
    
        this.state={
            register: false,
            success: false
        }
    }

    componentDidMount(){
        if(this.state.success==true){
            window.location.href = '/success'
        }
    }
    
    goLogin(e){
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            input: document.getElementById('email').value,
            password: document.getElementById('password').value
        }).then(

            res=>{
                const status = res.data.success;
                this.setState({
                    status: status  
                })

                // this.props.login(true, '', res.data.name).bind(this.props.apptis)
                

                if(document.getElementById('rememberme').checked){
                    window.localStorage.token = res.data.token;
                    window.localStorage.name = res.data.name;
                    window.localStorage.id = res.data.id;
                    window.localStorage.email = res.data.email;
                    window.localStorage.type = res.data.type;
                }
                else{ 
                    window.sessionStorage.token = res.data.token
                    window.sessionStorage.name = res.data.name;
                    window.sessionStorage.id = res.data.id;
                    window.sessionStorage.email = res.data.email
                    window.sessionStorage.type = res.data.type;
                }

                // this.props.apptis.setState({
                //     login:{
                //         status:true,
                //         id:'',
                //         name:res.data.name,
                //         email: res.data.email
                //     }
                // })

                this.props.apptis.checkStorage()
                
                
                console.log(res.data.name)
                document.body.style.overflow='auto'
            }
        )
    }

    render(){
        document.body.style.overflow='hidden'

        return (
            <div style={this.props.display!='none'?{
                position: "fixed",
                display: 'flex',
                zIndex: 500,
                width: '100vw',
                height: '100vh',
                left: 0,
                top: 0,
                backgroundColor:'#00000060'
            }:{display:'none'}}>
                <div style={{
                position: "relative",
                display: 'block',
                zIndex: 501,
                width: '300px',
                height: '200px',
                alignSelf: 'center',
                margin: '0 auto',
                backgroundColor:'white',
                borderRadius: '5px'
                }}>
                    <p style={{
                        zIndex: '600',
                        display: 'flex',
                        float:'right',
                        padding: '20px',
                        cursor: 'pointer'
                    }} className="bold gray-hover"
                    onClick={()=>{this.props.showLogin.bind(this.props.tis); window.location.reload()}}>
                        x
                    </p>

                    <p style={{
                        textAlign: 'center',
                        width:'inherit',
                        padding: '35px',
                        zIndex: -1
                    }} className='kakikecil green bold'>Message</p>
                    
                    <p style={{
                        textAlign: 'center',
                        width:'inherit',
                        padding: '35px',
                        zIndex: -1
                    }} className='bold'>{this.props.message}</p>
                    
                </div>
            </div>
        )
    }



}

export default BubblePop


