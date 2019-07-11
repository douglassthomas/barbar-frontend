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
import Footer from '../containers/Footer';

class HistoryPremium extends Component {

    constructor(){
        super()

        this.state = {
            loading:false,
            myPremium:[],
            my_next:<div></div>,
            my_prev:<div></div>,
            x:0,
            y:0
        }


        // console.log(this.props)
        
    }

    getMyPremium(url){
        this.setState({
            loading:true,
            myPremium:[]
        })

        Axios.post(url,{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            user_id:localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            
            if(res.data.next_page_url!=null){
                let tagged = <button className='btnIjo' onClick={()=>this.getMyPremium(res.data.next_page_url)}>NEXT</button>
                this.setState({
                    my_next: tagged
                })
            }
            if(res.data.prev_page_url!=null){
                let tagged = <button className='btnIjo' onClick={()=>this.getMyPremium(res.data.prev_page_url)}>PREV</button>
                this.setState({
                    my_prev: tagged
                })
            }
            
            this.setState({
                loading:false,
                myPremium:res.data.data
            })

            
        })

        
    }

    onMouseMove(e) {
        this.setState({ x: e.screenX, y: e.screenY });
    }

    

    popPremium(premium){
        let tagged = 
        <div style={{
            position:'absolute',
            width:'400px',
            backgroundColor:'white',
            zIndex:'9999',
            left: this.state.x+20,
            top: this.state.y-140,
            display:'flex',
            boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.75)'

        }}>
            <span>
                <span style={{fontSize:'75px'}}>{premium.day}</span>
                <span style={{fontSize:'13px'}}>day</span>
            </span>
            <div style={{padding:'20px'}}>
                <p>{premium.created_at}</p>
                <p>premium end: {premium.end_date}</p>
            </div>
        </div>

        this.setState({
            popPremium:tagged
        })
    }
    

    componentWillMount(){
    }

    componentDidMount(){
        var type = localStorage.type ? localStorage.type : sessionStorage.type
        if (type != 2) {
            this.props.history.push('/')
            return
        }

        this.getMyPremium('http://localhost:8000/api/getMyPremium')
        window.addEventListener('mousemove', (e)=>this.onMouseMove(e))
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
                <BC/>

                <div style={{minHeight:'80vh'}} className={fav_container}>
                    <h3>Transaction History</h3>
                    <ul style={{listStyleType:'none', padding:'0px'}}>
                        <li style={{backgroundColor:'lightgray', fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                            <div style={{width:'40%'}}><b>PLAN</b></div>
                            <div style={{width:'30%'}}><b>DATE</b></div>
                            <div style={{width:'30%'}}><b>PRICE</b></div>
                        </li>
                    {
                        this.state.myPremium.map((premium, idx)=>{
                            return(
                                <li key={idx} onMouseLeave={()=>this.setState({popPremium:''})}
                                onMouseEnter={()=>this.popPremium(premium)}
                                style={{backgroundColor:'white', fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                                    <div style={{width:'40%'}}>{premium.day+' days'}</div>
                                    <div style={{width:'30%'}}>{premium.created_at}</div>
                                    <div style={{width:'30%'}}>{premium.price}</div>
                                </li>
                            )
                        })
                    }
                    {this.state.popPremium}

                    </ul>
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                        {this.state.my_prev}
                        {this.state.my_next}
                    </div>
                </div>
                <Footer/>
            </>
        )
    }

}

export default withRouter(HistoryPremium)