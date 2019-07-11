import React, { Component } from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import axios from 'axios';
import eye from '../assets/eye.svg'
import Loading from '../containers/Loading';
import BC from '../components/BC';

class Register extends Component {

    constructor(){
        super()

        this.state = {
            error_message: [],
            loaded:true,
            type:1
        }
    }

    regis(e) {
        e.preventDefault()

        this.setState({
            error_message: []
        })

        axios.post('http://localhost:8000/api/register', {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value,
            type: this.state.type
        }).then(
            res => {
                console.log(res.data)
                if (res.data.success == true) {
                    alert('Success Register')
                }else{
                    this.setState({
                        error_message: [...this.state.error_message, res.data.name]
                    })
                    this.setState({
                        error_message: [...this.state.error_message, res.data.username]
                    })
                    this.setState({
                        error_message: [...this.state.error_message, res.data.email]
                    })
                    this.setState({
                        error_message: [...this.state.error_message, res.data.password]
                    })
                    this.setState({
                        error_message: [...this.state.error_message, res.data.phone]
                    })

                }

                this.setState({
                    loaded:true
                })
                // window.location.href = '/signin'
            }
        )
    }

    passwordChange() {
        document.getElementById('password').getAttribute('type') == 'password' ?
            document.getElementById('password').setAttribute('type', 'text') :
            document.getElementById('password').setAttribute('type', 'password')
    }

    passwordChangeConfirm() {
        document.getElementById('password_confirmation').getAttribute('type') == 'password' ?
            document.getElementById('password_confirmation').setAttribute('type', 'text') :
            document.getElementById('password_confirmation').setAttribute('type', 'password')
    }

    render() {
        let loading = this.state.loaded?'':<Loading/>
        let container = this.props.mode == 'desktop' ?
            <div className='container-profile'>
                <form onSubmit={(e) => this.regis(e)}>
                    <table className='table-text'>
                        <tr>
                            <td className='small-text'>Full Name</td>
                            <td><input id='name' className='btnIjo input-text' type='text' required autoFocus></input></td>
                        </tr>
                        <tr>
                            <td className='small-text'>username</td>
                            <td><input id='username' className='btnIjo input-text' type='text' required></input></td>
                        </tr>
                        <tr>
                            <td className='small-text'>Email</td>
                            <td><input id='email' className='btnIjo input-text' type='email' required></input></td>
                        </tr>
                        <tr>
                            <td className='small-text'>Phone</td>
                            <td><input id='phone' className='btnIjo input-text' type='text'></input></td>
                        </tr>
                        <tr>
                            <td className='small-text'>Password</td>
                            <td><input style={{ width: '300px', height: '40px', margin: '5px', marginRight: '10px' }} id='password' className='btnIjo' type='password' required></input><img style={{ width: '20px' }} onClick={this.passwordChange} src={eye}></img></td>
                        </tr>
                        <tr>
                            <td className='small-text'>Confirm Password</td>
                            <td><input style={{ width: '300px', height: '40px', margin: '5px', marginRight: '10px' }} id='password_confirmation' className='btnIjo' type='password' required></input><img style={{ width: '20px' }} onClick={this.passwordChangeConfirm} src={eye}></img></td>
                        </tr>
                    </table>
                    <center>
                        <input type='submit' className='btnIjo-selected' value='Register'></input>
                    </center>
                </form>
            </div> 
            : 
            <form onSubmit={(e) => this.regis(e)}>
                

            <div className='container-profile-mobile'>

                
                <input placeholder='Full Name' id='name' className='btnIjo input-text-mobile' type='text' required autoFocus></input>
                <input placeholder='Username' id='username' className='btnIjo input-text-mobile' type='text' required></input>
                <input placeholder='Email' id='email' className='btnIjo input-text-mobile' type='email' required></input>
                <input placeholder='Phone Number' id='phone' className='btnIjo input-text-mobile' type='text'></input>
                <div><input placeholder='Password' style={{ width: 'calc(100% - 50px)', maxWidth: '300px', height: '40px', margin: '5px', marginRight: '10px' }} id='password' className='btnIjo' type='password' required></input> <img style={{ width: '20px' }} onClick={this.passwordChange} src={eye}></img></div>
                <div><input placeholder='Retype Password' style={{ width: 'calc(100% - 50px)', maxWidth: '300px', height: '40px', margin: '5px', marginRight: '10px' }} id='password_confirmation' className='btnIjo' type='password' required></input> <img style={{ width: '20px' }} onClick={this.passwordChangeConfirm} src={eye}></img></div>
                <center>
                    <input type='submit' className='btnIjo-selected' value='Register'></input>
                </center>
                </div>
            </form >

        return (
            <>
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC/>
                <center>
                    <p className='error_message_text'>
                        {this.state.error_message}
                    </p>

                </center>
                {loading}
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
                    <span className='small-text green'>
                    <input style={{ marginLeft: '10px', marginRight: '5px'}} onClick={()=>this.setState({type:2})} type='radio' id='owner' className='btnIjo' name='type' value="owner" />
                        <label for='owner'>OWNER</label>
                    <input style={{ marginLeft: '10px', marginRight: '5px' }} onClick={()=>this.setState({type:1})} type='radio' id='guest' className='btnIjo' name='type' value="guest" />
                        <label for='guest'>GUEST</label>
                    </span>
                </div>
                {container}

                
                    


            </>
        )
    }

}

export default Register