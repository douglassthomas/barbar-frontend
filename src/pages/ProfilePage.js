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

class ProfilePage extends Component {

    constructor(){
        super()

        this.state = {
            status:'',
            info:'',
            properties:[],
            favorite:[],
            followingcount:0
        }


        // console.log(this.props)
        
    }

    getOwnerData(id){
        Axios.post('http://localhost:8000/api/getOwnerData',{
            id:id
        }).then(res=>{
            this.setState({
                followingcount:res.data
            })
        })
    }

    getFavoriteByUserId() {
        this.setState({
            favorite: [],
            loading:true
        })

        Axios.post('http://localhost:8000/api/getFavoriteByUserId', {
            user_id:localStorage.id?localStorage.id:sessionStorage.id,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(
            res => {
                const arrRes = res.data.data
                // console.log(res.data.data)

                for (const a of arrRes) {
                    var result = a.property_id
                    let tagged = <Reco premium={premium} id={result.owner_id} property_id={result.id} promote={promote} info={result} header={'http://localhost:8000/images/banner/'+result.banner_id} name={result.name} price={result.price} size={'cari'}/>

                    // console.log(result.owner_id)
                    this.setState({
                        favorite: [...this.state.favorite, tagged],
                        loading:false
                    })
                }

            }
        ).catch(()=>{
            this.setState({
                loading:false
            })
        })
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

            this.getOwnerData(res.data.id)
            // document.getElementById('profilepic').src = 'http://localhost:8000/images/profile_picture/'+res.data.profile_pic
        })
    }

    componentWillMount(){
    }

    getAllProperty() {
        this.setState({
            properties: []
        })

        Axios.get('http://localhost:8000/api/getAllProperty?type='+this.state.type+'&latitude='+this.state.lat+"&longitude="+this.state.long+"&perPage=10", {
        }).then(
            res => {
                const arrRes = res.data.data
                // console.log(res.data.data)

                for (const result of arrRes) {
                    
                    let tagged = <Reco premium={premium} id={result.owner_id} property_id={result.id} promote={promote} info={result} header={'http://localhost:8000/images/banner/'+result.banner_id} name={result.name} price={result.price} size={'cari'}/>

                    // console.log(result.owner_id)
                    this.setState({
                        properties: [...this.state.properties, tagged]
                    })
                }

            }
        )
    }

    componentDidMount(){
        var id = localStorage.id?localStorage.id:sessionStorage.id
        socket.emit('check')

        socket.on('check-'+id, function (status) {
            console.log(status)
            this.setState({
                status:status
            })
        })
        this.getUserInfo()
        this.getFavoriteByUserId()
    }

    render() {
        
        let navigations = this.props.nav
        let container = this.props.mode == 'desktop' ? 'container_profile' : 'container-profile'
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'
        let profile_box_container = this.props.mode == 'mobile' ? 'profile-box-container-mobile' : 'profile-box-container'
        let status = this.state.status

        let type=this.props.apptis.state.login.type
        if(type!=1 && type!=2){
            this.props.history.replace('/')
          }

        return (
            <>
            {this.state.loading?<Loading></Loading>:''}
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC />

                <div className={container}>
                    <div className={img_container}>
                        <img className="profilepic" src={'http://localhost:8000/images/profile_picture/'+this.state.info.profile_pic} />
                    </div>

                    <div className='info'>
                        <p className="big-font name"> {this.props.apptis.state.login.name}
                            <img style={{ marginLeft: '5px', width: '15px', height: '15px', marginTop: '5px' }} src={verified}></img>
                        </p>
                        <Link className='no_decoration' to='profile/edit-profile'>
                            <button className="btnIjo edit-profile">Edit Profile</button>
                        </Link>
                    </div>

                    <div className={profile_box_container}>
                        <div>
                            <img style={{ width: '15px', height: '15px', marginTop: '5px' }} src={home}></img>
                            <span className='small-font gray'>Jakarta</span>

                        </div>

                        <div>
                            <img style={{ width: '15px', height: '15px', marginTop: '5px' }} src={people}></img>
                            <span className='small-font gray'>Join since </span>
                            <span style={{ fontSize: '14px' }} id='joinsince' className='gray'>20 Mei 2019</span>
                        </div>

                        <Link to={{pathname:'/profile/following', state:{
                            id:this.state.info.id
                        }}}><div className="following-box btnIjo-selected">
                            {this.state.followingcount} Following
                        </div></Link>
                        <div className='status-container'>
                            <span className='small-text green'>Status:</span>
                            <span className='small-font gray'>{status}</span>
                        </div>

                    </div>



                </div>
                <div className={fav_container}>
                    <div>
                        <span className='green name'>{this.props.apptis.state.login.name}</span>
                        <span className='green'>'s Favorite</span>

                        <button className='fav-button btnIjo-selected'>
                            View all
                        </button>
                    </div>


                    <div style={{
                        display: 'flex',
                        padding: '15px',
                        width: 'inherit',
                        overflowX:'auto'
                    }} className=''>
                        
                        {this.state.favorite}
                    </div>

                </div>

            </>
        )
    }

}

export default withRouter(ProfilePage)