import React, {Component} from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import Loading from '../containers/Loading';
import Reco from '../components/Reco';
import BC from '../components/BC';
import premium from '../assets/premium.svg'
import promote from '../assets/promote.svg'
import People from '../components/People';
import Axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

class HistoryPage extends Component{
    constructor(){
         super()

         this.state={
             loading:false,
             peopleChat:[],
             select:'favorite',
             favorite:[],
            history:[]
         }
    }

    getChatList(){
        Axios.post('http://localhost:8000/api/getChatList', {
            id: localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                peopleChat: []
            })

            for(const c of res.data){
                let recM = 
                <Link className='no_decoration' to='/chat'>
                    <People 
                    type='panel' 
                    peoplename={c.user.name} 
                    message={c.last_chat.contents}
                    profile_pic={c.user.profile_pic}/>
                </Link>

                this.setState({
                    peopleChat: [...this.state.peopleChat, recM]
                })
            
            }
        })
    }

    setSelect(select){
        console.log(select)
        this.setState({
            select: select
        })
    }

    componentDidMount(){
        this.getChatList();

        var type = localStorage.type?localStorage.type:sessionStorage.type
        if(type!='1'){
            this.props.history.replace('/')
        }
        this.getFavoriteByUserId();
        this.getHistoryByUserId();
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
        )
    }

    getHistoryByUserId() {
        this.setState({
            history: [],
            loading:true
        })

        Axios.post('http://localhost:8000/api/getHistoryByUserId', {
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
                        history: [...this.state.history, tagged],
                        loading:false
                    })
                }

            }
        )
    }

    render(){
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let loading = this.state.loading?<Loading></Loading>:''

        
        let favo=this.state.select=='favorite'?<div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', marginTop:'50px', justifyContent:'center'}}>
            {this.state.favorite}
        </div>:''

        let histo=this.state.select=='history'?<div style={{display:'flex', flexDirection:'row', overflowX:'auto',marginTop:'50px'}}>
            {this.state.history}
        </div>:''

        document.body.style.overflowX='hidden'
        return (
            <>
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC></BC>

                <div className={fav_container}>
                    <div style={{
                        display:'flex',
                        justifyContent:'center', 
                        alignItems:'center',
                        height:'300px',
                        flexWrap:"wrap",
                        overflowY:'auto',
                        borderRadius:'10px',
                        backgroundColor:'rgba(4, 172, 54)'}}>
                            <div style={{maxHeight:'300px', backgroundColor:'white', borderRadius:'10px', margin:'20px'}}>
                                {this.state.peopleChat}
                            </div>
                            <div style={{width:'140px', textAlign:'center'}} className='btnOrange'>
                                Check your inbox
                            </div>
                        </div>
                </div>

                <div className={fav_container}>
                    <div style={{display:'flex', backgroundColor:'rgba(4, 172, 54)'}}>
                        <div style={{fontFamily:'arial', fontWeight:'500', width:'50%', 
                        borderBottom:'0px solid #FFFFFF', borderRadius:'10px 10px 0px 0px'}} 
                        className={this.state.select=='favorite'?'btnIjo':'btnIjo-select'}
                        onClick={()=>this.setSelect('favorite')}>
                            Favorite
                        </div>
                        <div style={{fontFamily:'arial', fontWeight:'500', width:'50%',
                        borderBottom:'0px solid #FFFFFF', borderRadius:'10px 10px 0px 0px'}} 
                        className={this.state.select=='history'?'btnIjo':'btnIjo-select'}
                        onClick={()=>this.setSelect('history')}>
                            History
                        </div>
                    </div>
                    {favo}
                    {histo}
                </div>
               


                
            </>
        )
    }

}

export default withRouter(HistoryPage)