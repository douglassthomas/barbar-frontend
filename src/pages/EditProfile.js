import React, { Component } from 'react'
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import NavBar from '../containers/NavBar';
import jodie from '../assets/jodie.jpg';
import axios from 'axios'
import Axios from 'axios';
import BubblePop from '../components/BubblePop';
import BC from '../components/BC';

class EditProfile extends Component {

    constructor(){
        super()

        this.state={
            info:'',
            message:''
        }
    }

    showLogin(){
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow='auto'
    }

    goEdit() {
        let form = new FormData()

        form.append('input-image', document.getElementById('input-image').files[0])
        form.append('id', window.localStorage.id?window.localStorage.id:window.sessionStorage.id);
        form.append('token', window.localStorage.token?window.localStorage.token:window.sessionStorage.token);

        axios.post('http://localhost:8000/api/editProfile', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': 'Bearer ' + window.localStorage.token
            }
        }).then(
            res => {
                if(res.data.status){
                    this.setState({
                        message:<><BubblePop message={'login first!'} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                    })
                }
                else{
                    this.setState({
                        message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                    })
                }
                
            }
        )

    }

    handleChange() {
        var file = this.refs.profpic.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(reader.result)

        reader.onloadend = function (e) {

            document.getElementById('profile_picture').src = reader.result
            
        }.bind(this);
    }

    getUserInfo(){
        var id = window.localStorage.id?localStorage.id:sessionStorage.id
        console.log(id)
        Axios.get('http://localhost:8000/api/getUserInfo?id='+id,{

        })
        .then(res=>{
            this.setState({
                info: res.data
            })
        })
    }

    goChangePassword(){
        Axios.post('http://localhost:8000/api/goChangePassword',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:localStorage.id?localStorage.id:sessionStorage.id,
            curr_password:document.getElementById('curr_password').value,
            new_password: document.getElementById('new_password').value
        }).then(res=>{
            if(res.data.success==false){
                this.setState({
                    message:<><BubblePop message='Invalid current password' apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                })
            }
            else{
                this.setState({
                    message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                })
            }
        })
    }

    goEditProfileInfo(){
        Axios.post('http://localhost:8000/api/goEditProfileInfo',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:localStorage.id?localStorage.id:sessionStorage.id,
            full_name:document.getElementById('full_name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        }).then(res=>{
            if(res.data.success==false){
                this.setState({
                    message:<><BubblePop message='Invalid current password' apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                })
            }
            else{
                this.setState({
                    message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
                })
            }
        })
    }

    componentDidMount(){
        if(!localStorage.token&&!sessionStorage.token){
            
            window.location.href = '/'
        }else if(localStorage.type==0 || sessionStorage.type==0){
            window.location.href = '/'       
        }
        this.getUserInfo()
        console.log(this.state.info.profile_pic)
    }

    render() {
        let navigations = this.props.nav
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'
        let container = this.props.mode == 'desktop' ? 'container_profile' : 'container-profile'


        return (
            <>
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC/>

                <div style={{minHeight:'100vh'}} className='container-edit-profile'>
                    <div className={img_container}>
                        <img id='profile_picture' className="profilepic" src={'http://localhost:8000/images/profile_picture/'+this.state.info.profile_pic} />
                        <input ref="profpic" id='input-image' className='hide' type='file' onChange={() => this.handleChange()}></input>
                        <label style={{position:'absolute', marginTop:'70px'}} for="input-image" className='btnIjo' >Change</label>
                    </div>
                    <button onClick={this.goEdit.bind(this)} className='btnIjo-selected'>SAVE IMAGE</button>

                    <table className='table-text'>
                        <tr>
                            <td><label className='small-text gray'>Full Name</label></td>
                            <td>
                                <input id='full_name' type='text' className='input-text btnIjo' placeholder={this.state.info.name}></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label className='small-text gray'>Email</label></td>
                            <td>
                                <input id='email' type='text' className='input-text btnIjo' placeholder={this.state.info.email}></input>
                            </td>
                        </tr>
                        {this.state.info.email_verified_at==null?<tr>
                            <td><label className='small-text gray'>Verify email</label></td>
                            <td>
                                <button className='btnIjo-selected input-text'>Send email verification to {this.props.apptis.state.login.email}</button>
                            </td>
                        </tr>:''}
                        <tr>
                            <td><label className='small-text gray'>Phone</label></td>
                            <td>
                                <input id='phone' type='text' className='input-text btnIjo' placeholder={this.state.info.phone}></input>
                            </td>
                        </tr>
                        
                        <tr>
                            <td><label className='small-text gray'>Join Since</label></td>
                            <td>
                                <input type='text' disabled className='input-text btnOrange' placeholder="join since" value={this.state.info.created_at}></input>
                            </td>
                        </tr>

                    </table>
                    {this.state.message}
                    <button className='btnIjo-selected' onClick={this.goEditProfileInfo.bind(this)}>Save</button>

                    <table className='table-text'>
                        Change Password
                        <tr>
                            <td><label className='small-text gray'>Current Password</label></td>
                            <td>
                                <input type='password' id='curr_password' className='input-text btnIjo' placeholder=''></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label className='small-text gray'>New Password</label></td>
                            <td>
                                <input type='password' id='new_password' className='input-text btnIjo' placeholder=''></input>
                            </td>
                        </tr>
                    </table>
                    <button className='btnIjo-selected' onClick={this.goChangePassword.bind(this)}>Change Passowrd</button>
                </div>

            </>
        )

    }

}

export default EditProfile