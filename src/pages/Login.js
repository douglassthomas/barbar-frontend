import React, { Component } from 'react'
import logo from '../assets/logoibu.png'
import { Link, withRouter } from 'react-router-dom'
import illustration from '../assets/Illustration-slide-2.svg'
import premium from '../assets/premium.svg'
import axios from 'axios'
import { stat } from 'fs';
import BubPop from '../components/BubPop.js'
import Footer from '../containers/Footer';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            register: false,
            success: false,
            bottomhide: false,
            error: ''
        }
    }

    componentDidMount() {
        if (this.state.success == true) {
            window.location.href = '/'
        }

        window.addEventListener('resize', () => {
            console.log(this.props.mode)

        })

        window.addEventListener('scroll', () => {
            if (window.scrollY < 10) {
                // console.log('aa')
                this.setState({
                    bottomhide: false
                })
            }
            else {
                // console.log('jj')
                this.setState({
                    bottomhide: true
                })
            }
        })

        var type = localStorage.type ? localStorage.type : sessionStorage.type

        if (type) {
            this.props.history.push('/')
            return
        }

    }

    goLogin(e) {
        e.preventDefault();
        this.setState({
            error:''
        })

        axios.post('http://localhost:8000/api/login', {
            input: document.getElementById('email').value,
            password: btoa(document.getElementById('password').value)
        }).then(

            res => {
                
                // console.log('type: '+res.data.type)


                const status = res.data.success;
                
                // alert(res.data)
                if (status == true) {

                    if(res.data.type!=2){
                        console.log('a')
                        this.setState({
                            error:<BubPop message='no associate owner account!'></BubPop>
                        })
                        return
                    }

                    this.setState({
                        status: status
                    })

                    // this.props.login(true, '', res.data.name).bind(this.props.apptis)


                    if (document.getElementById('rememberme').checked) {
                        window.localStorage.token = res.data.token;
                        window.localStorage.name = res.data.name;
                        window.localStorage.id = res.data.id;
                        window.localStorage.email = res.data.email;
                        window.localStorage.type = res.data.type;
                    }
                    else {
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

                    window.location.href='/'
                    return;
                }else{
                    // alert('error')
                    this.setState({
                        error:<BubPop message={res.data.message}></BubPop>
                    })
                }

            }
        )
    }

    hideBar() {
        this.setState({
            bottomhide: !this.state.bottomhide
        })
    }

    switchReg() {
        this.setState({
            register: !this.state.register
        })
    }

    render() {
        let bottomhide = this.state.bottomhide ? 'bottombar-hide' : 'bottombar'
        let errorMsg = this.state.error

        let right = this.props.mode == 'desktop' ? <div className='loginRight'>
            <p className="illustration-text">Mau iklan mu tampil di atas?
            <br />
                Jadilah
                <img className="logo20" src={premium}></img>
                <b> Premium Member </b>
                Barbarkos
            </p>
            <img src={illustration} className="center illustration"></img>

        </div> : <div className={bottomhide}>
                <p className='center' style={{
                    marginTop: '20px',
                    color: 'white',
                    position: "absolute",
                    width: 'inherit',

                }} >
                    Install Aplikasi Barbarkos
                        <button style={{
                        border: '1px solid #FFFFFF',
                        outline: 'none',
                        backgroundColor: '#02a85b',
                        color: 'white',
                        marginLeft: '5px'
                        // fontSize: '15px'
                    }}>install</button>
                </p>

            </div>

        let fullsc = this.props.mode != 'desktop' ? { width: 'inherit', overflowY: 'auto' } : {}

        let left = !this.state.register ? <div style={fullsc} className='loginLeft'>
            <div style={{ paddingTop: '30px' }}>
                <Link to='/' style={{ textDecoration: 'none' }} className='green point'>⇦ Kembali ke Beranda</Link>
            </div>
            <div>
                <img src={logo} style={{ borderRadius: '50%', backgroundColor: '#02a85be0', marginTop: '60px' }} />
                <h1 style={{ paddingTop: '10px' }}>Login</h1>
                <h2 style={{
                    paddingTop: '10px',
                    marginBottom: '30px'
                }} className='lightgray'>Pemilik Kos</h2>

                {errorMsg}

                <form onSubmit={(e) => this.goLogin(e)} className='frame'>
                    <input id='email' type='text' className='inputframe' placeholder='081234xx' />
                    <label className='lightgray focusijo'>No. Handphone</label>
                    <input style={{ marginTop: '40px' }} id='password' type='password' className='inputframe' placeholder='' />
                    <label className='lightgray focusijo'>Password</label>

                    <div className='lupapass'>
                        <input id='rememberme' type='checkbox' className='' /> Remember Me
                </div>

                    <input type='submit' className='bigbutton' />
                    <span style={{ marginBottom: '100px' }} className="gray center">Belum punya akun?
                    <p className="orange point" onClick={this.switchReg.bind(this)}>Yuk daftar</p>
                    </span>
                </form>
            </div>
            <Footer></Footer>

        </div> : <div style={fullsc} className='loginLeft'>
                <div style={{ paddingTop: '30px' }}>
                    <Link to='/' style={{ textDecoration: 'none' }} className='green point'>⇦ Kembali ke Beranda</Link>
                </div>
                <div>
                    <img src={logo} style={{ borderRadius: '50%', backgroundColor: '#02a85be0', marginTop: '60px' }} />
                    <h1 style={{ paddingTop: '10px' }}>Pasang Iklan</h1>
                    <h2 style={{
                        paddingTop: '10px',
                        marginBottom: '30px'
                    }} className='lightgray'>Saya ingin memasang iklan</h2>

                    <form className='frame'>
                        <div style={{ paddingBottom: '10px' }}>
                            <input required type='radio' value='Kost' name='jenis' /> <span style={{ marginLeft: '15px' }}>Kost</span>
                        </div>

                        <div style={{ paddingBottom: '10px' }}>
                            <input required type='radio' value='Apartemen' name='jenis' /> <span style={{ marginLeft: '15px' }}>Apartemen</span>
                        </div>
                        <div style={{ borderBottom: '1px solid green' }}>
                            <select style={{ marginTop: '60px', borderBottom: '0px', backgroundColor: 'white' }} id='phonenumber' type='text' className='inputframe'>
                                <option value='pemilikkos'>Pemilik Kos</option>
                                <option value='pengelolakos'>Pengelola Kos</option>
                                <option value='anakkos'>Anak Kos</option>
                                <option value='agen'>Agen</option>
                                <option value='lainnya'>Lainnya</option>
                            </select>
                        </div>

                        <label for='role' className='lightgray focusijo'>Saya input sebagai</label>
                        <input style={{ marginTop: '60px' }} id='phonenumber' type='text' className='inputframe' placeholder='081234xx' />
                        <label for='phonenumber' className='lightgray focusijo'>No. Handphone</label>



                        <input type='submit' className='bigbutton' value='Pasang Iklan' />
                        <p style={{ marginBottom: '100px' }} className="gray center marginbottom20">Sudah punya akun?
                                <p className="orange point" onClick={this.switchReg.bind(this)}>Login di sini</p>
                        </p>
                    </form>
                </div>
            </div>

        let container = this.props.mode != 'desktop' ? 'loginContainer-mobile' : 'loginContainer'
        
        
        return (
            <>
                <div className={container}>

                    {left}
                    {right}

                </div>
            </>
        )
    }
}

export default withRouter(Login)