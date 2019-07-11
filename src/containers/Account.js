import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading';
import Axios from 'axios';

class Account extends Component {

    constructor(){
        super()

        this.state={
            follow:true,
            loading:false
        }
    }

    unfollow(){
        this.setState({
            loading:true
        })
        Axios.post('http://localhost:8000/api/unfollow',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            guest_id:localStorage.id?localStorage.id:sessionStorage.id,
            owner_id:this.props.info.id
        }).then(res=>{
            this.setState({
                loading:false,
                follow:false
            })

        })


    }

    goFollow(){
        this.setState({
            loading:true
        })
        Axios.post('http://localhost:8000/api/follow',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            guest_id:localStorage.id?localStorage.id:sessionStorage.id,
            owner_id:this.props.info.id
        }).then(res=>{
            this.setState({
                loading:false,
                follow:true
            })

        })


    }

    render() {
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'

        return (

            <div className='account-box hoverable'>
                {this.state.loading?<Loading></Loading>:''}
                <Link style={{
                    textDecoration: 'none',
                    
                }} to={'/owner/'+this.props.info.id}>
                    <div className='img_container'>
                        <img className="profilepic" src={this.props.info?'http://localhost:8000/images/profile_picture/'+this.props.info.profile_pic:''} />
                    </div>

                    <center>
                    
                    </center>
                </Link>
                <div style={{display:'flex', flexDirection:'column', width:'auto', justifyContent:'center'}}>
                    <span id='name' style={{ margin: '5px' }} className='big-text green'>
                        {this.props.info? this.props.info.name:''}
                    </span>
                {this.state.follow?
                    <button onClick={()=>this.unfollow()} className='btnOrange'>Unfollow</button>:
                    <button onClick={()=>this.goFollow()} className='btnIjo-selected'>Follow</button>}
                </div>
            </div>

        )
    }

}

export default Account