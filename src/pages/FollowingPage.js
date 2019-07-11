import React, {Component} from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import jodie from '../assets/jodie.jpg'
import Account from '../containers/Account';
import BC from '../components/BC';
import Axios from 'axios';
import {withRouter} from 'react-router-dom'

class FollowingPage extends Component{

    constructor(){
        super()

        this.state = {
            loading:false,
            following:[]
        }

    }

    getFollowing(){
        this.setState({
            loading:true
        })

        Axios.post('http://localhost:8000/api/getFollowing',{
            id:this.props.location.state.id
        }).then(res=>{
            this.setState({
                following:res.data,
                loading:false
            })
        })
    }

    componentDidMount(){
        this.getFollowing()
        var type = localStorage.type ? localStorage.type : sessionStorage.type

        if (type!='1') {
            this.props.history.push('/')
            return
        }
    }
    
    render(){
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'

        return(
            <>
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC/>

                <div className={fav_container}>
                    <span style={{margin:'10px'}} className='green'>
                        Following
                    </span>
                </div>

                <div className={fav_container}>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'wrap'
                    }}>
                        {this.state.following.map((f, idx)=>{
                            return(
                                <Account mode={this.props.mode} key={idx} info={f.owner_id} reload={this.getFollowing.bind(this)}/>
                            )
                        })}
                        
                        
                    </div>
                </div>
            </>
        )
    }


}

export default withRouter(FollowingPage)