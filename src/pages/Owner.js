import React, { Component } from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import BC from '../components/BC';
import jodie from '../assets/jodie.jpg'
import home from '../assets/home.png'
import verified from '../assets/verified.png'
import people from '../assets/people.png'
import Reco from '../components/Reco.js'
import header from '../assets/header.jpg'
import premium from '../assets/premium.svg'
import promote from '../assets/promote.svg'
import { Link, withRouter } from 'react-router-dom'
import {socket} from '../Api.js'
import Axios from 'axios';
import Loading from '../containers/Loading';

class Owner extends Component {

    constructor(){
        super()

        this.state = {
            status:'',
            info:'',
            followed:false,
            kost:[],
            apartement:[]
        }


        // console.log(this.props)
        
    }

    getUserInfo(){
        this.setState({
            loading: true
        })
        var id = this.props.match.params.id
        Axios.get('http://localhost:8000/api/getUserInfo?id='+id,{

        })
        .then(res=>{
            this.setState({
                info: res.data,
                loading:false
            })

            this.checkFollow()
            // document.getElementById('profilepic').src = 'http://localhost:8000/images/profile_picture/'+res.data.profile_pic
        })
    }
    

    componentWillMount(){
    }

    componentDidMount(){
        this.getUserInfo();
        if(localStorage.type!=1 && sessionStorage.type!=1){
            this.props.history.replace('/')
        }
        this.getMyApartement()
        this.getMyKost()
        
    }

    checkFollow(){
        Axios.post('http://localhost:8000/api/checkFollow',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            guest_id:localStorage.id?localStorage.id:sessionStorage.id,
            owner_id:this.state.info.id
        }).then(res=>{
            if(res.data==true){
                this.setState({
                    loading:false,
                    followed:true
                })
            }else{
                this.setState({
                    loading:false,
                    followed:false
                })
            }

            this.setState({
                loading:false
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
            owner_id:this.state.info.id
        }).then(res=>{
            this.setState({
                loading:false
            })

            this.checkFollow()
        })


    }

    unfollow(){
        this.setState({
            loading:true
        })
        Axios.post('http://localhost:8000/api/unfollow',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            guest_id:localStorage.id?localStorage.id:sessionStorage.id,
            owner_id:this.state.info.id
        }).then(res=>{
            this.setState({
                loading:false
            })

            this.checkFollow()
        })


    }

    getMyKost(){
        Axios.post('http://localhost:8000/api/getKostByOwnerId',{
            owner_id:this.props.match.params.id
        }).then(res=>{
            this.setState({
                kost:[]
            })

            for(const m of res.data.data){
                let rec = <>
                
                    <div style={{width:'200px', margin:'5px'}} className='hoverable'>
                        <div style={{
                            backgroundImage:'url(http://localhost:8000/images/banner/'+m.banner_id+')',
                            width: '200px',
                            height: '200px',
                            backgroundSize: 'cover'
                        }}></div>
                        
                        <div style={{overflow: 'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize:'14px'
                        }} className='green'>
                            {m.name}
                        </div>

                       <Link to={'/detail/'+m.id}><div style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo'>VIEW</div></Link>
                    </div>
                </>
                
                this.setState({
                    kost:[...this.state.kost, rec]
                })
            }

        })
    }

    getMyApartement(){
        Axios.post('http://localhost:8000/api/getApartementByOwnerId',{
            owner_id:this.props.match.params.id
        }).then(res=>{
            this.setState({
                apartement:[]
            })

            for(const m of res.data.data){
                let rec = <>
                
                    <div style={{width:'200px', margin:'5px'}} className='hoverable'>
                        <div style={{
                            backgroundImage:'url(http://localhost:8000/images/banner/'+m.banner_id+')',
                            width: '200px',
                            height: '200px',
                            backgroundSize: 'cover'
                        }}></div>
                        
                        <div style={{overflow: 'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize:'14px'
                        }} className='green'>
                            {m.name}
                        </div>
                        <Link to={'/detail/'+m.id}><div style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo'>VIEW</div></Link>
                    </div>
                </>
                
                this.setState({
                    apartement:[...this.state.apartement, rec]
                })
            }

        })
    }

    render() {
        
        let navigations = this.props.nav
        let container = this.props.mode == 'desktop' ? 'container_profile' : 'container-profile'
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'
        let profile_box_container = this.props.mode == 'mobile' ? 'profile-box-container-mobile' : 'profile-box-container'
        let status = this.state.status

        return (
            <>
            {this.state.loading?<Loading></Loading>:''}
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <div className={container}>
                    <div className={img_container}>
                        <img className="profilepic" src={'http://localhost:8000/images/profile_picture/'+this.state.info.profile_pic} />
                    </div>

                    <div className='info'>
                        <p className="big-font name"> {this.state.info.name}
                            <img style={{ marginLeft: '5px', width: '15px', height: '15px', marginTop: '5px' }} src={verified}></img>
                        </p>
                        {localStorage.id?localStorage.id==this.state.info.id||sessionStorage.id==this.state.info.id?<Link className='no_decoration' to='profile/edit-profile'>
                            <button className="btnIjo edit-profile">Edit Profile</button>
                        </Link>:'':''}
                    </div>

                    <div className={profile_box_container}>
                        <div>
                            <img style={{ width: '15px', height: '15px', marginTop: '5px' }} src={home}></img>
                            <span className='small-font gray'>Jakarta</span>

                        </div>

                        <div>
                            <img style={{ width: '15px', height: '15px', marginTop: '5px' }} src={people}></img>
                            <span className='small-font gray'>Join since </span>
                            <span style={{ fontSize: '14px' }} id='joinsince' className='gray'>{this.state.info.created_at}</span>
                        </div>

                        {localStorage.type==1||sessionStorage.type==1?
                        this.state.followed==false?
                        <div onClick={()=>this.goFollow()}
                        className="following-box btnIjo-selected">
                            Follow
                        </div>:
                        <div onClick={()=>this.unfollow()}
                        className="following-box btnOrange-selected">
                            Unfollow
                        </div>
                        :''}
                        <div className='status-container'>
                            <span className='small-text green'>Status:</span>
                            <span className='small-font gray'>{status}</span>
                        </div>

                    </div>

                    
                </div>

                <span className={fav_container+' green'} style={{marginTop:'20px'}} >Owner's Kost</span>
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '15px',
                }} className={this.props.mode == 'desktop' ? 'container-r' : 'container-r-mobile'}>
                    {this.state.kost}
                </div>

                <span className={fav_container+' green'} style={{marginTop:'20px'}} >Owner's Apartement</span>
                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '15px',
                }} className={this.props.mode == 'desktop' ? 'container-r' : 'container-r-mobile'}>
                    {this.state.apartement}
                </div>
            </>
        )
    }

}

export default withRouter(Owner)