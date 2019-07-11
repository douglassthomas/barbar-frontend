import React, {Component} from 'react'
import axios from 'axios'
import {Link, BrowserRouter} from 'react-router-dom'
import Register from '../pages/Register.js'
import BubPop from './BubPop.js';

class FloatLogin extends Component{
    constructor(){
        super();
    
        this.state={
            register: false,
            success: false,
            errorm:'',
            error:''
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
            password: btoa(document.getElementById('password').value)
        }).then(

            res=>{
                const status = res.data.success;

                if(res.data.type==2){
                    console.log('a')
                    this.setState({
                        error:<BubPop message='no associate guest account!'></BubPop>
                    })
                    return
                }

                if(status!=false)
                {this.setState({
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
                }}
                else{
                    this.setState({
                        errorm:<><BubPop message={res.data.message} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                    })
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
                
                if(res.data.type==1)window.location.href='/'
                console.log(res.data.name)
                document.body.style.overflow='auto'
            }
        )
    }

    render(){
        document.body.style.overflow='hidden'

        return (
            <div style={{
                position: "fixed",
                display: 'flex',
                zIndex: 100,
                width: '100vw',
                height: '100vh',
                left: 0,
                top: 0,
                backgroundColor:'#00000060'
            }}>
                {this.state.error}

                <div style={{
                position: "relative",
                display: 'block',
                zIndex: 501,
                width: '300px',
                height: '320px',
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
                    onClick={this.props.showLogin.bind(this.props.tis)}>
                        x
                    </p>

                    <p style={{
                        position: 'absolute',
                        textAlign: 'center',
                        width:'inherit',
                        padding: '35px',
                        zIndex: -1
                    }} className='kakikecil green bold'>Masuk</p>
                    {/* <p style={{color:'red'}}>{this.state.errorm}</p> */}
                    <form >
                        <center><input style={{
                            marginTop: '15px',
                            width: '280px',
                            height:'40px',
                            textAlign: 'center'
                        }} type='text' placeholder="username/email" id="email"/>
                        </center>
                        <center><input style={{
                            marginTop: '15px',
                            width: '280px',
                            height:'40px',
                            textAlign: 'center'
                        }} type='password' placeholder="username/email" id="password"/>
                        </center>

                        <input style={{
                            marginTop: '30px',
                            marginBottom: '5px',
                            marginLeft: '180px'
                        }} id='rememberme' type="checkbox"/> <span className='kakikecil gray'>Remember me</span>

                        <center><input style={{
                            marginTop:'10px',
                            width: '280px',
                            height:'40px',
                            textAlign: 'center',
                            border: 'none',
                            backgroundColor: 'rgb(4, 172, 54)',
                            color: 'white'
                        }} type='submit'
                        value='Log in'
                        onClick={(e)=>this.goLogin(e)} />
                        </center>
                        <Link to='/register'
                        style={{
                            marginTop: '15px'
                        }}
                        className='center kakikecil green' to='/register'>Register</Link>
                    </form>
                    
                </div>
            </div>
        )
    }



}

export default FloatLogin


