import React, {Component} from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Navigation from '../components/Navigation';
import hamburger from '../assets/hamburger.png'
import FloatLogin from '../components/FloatLogin';
import Axios from 'axios';


class NavBar extends Component{
    constructor(){
        super();

        this.state={
            showForm:false,
            showMasuk:false,
            dropdown:false,
            godown:false,
            loginPencari:false,
            accKit: false,

            vip:false,
            resultSearch:[]
        };
    }

    showDown(){

        this.setState({
            godown: !this.state.godown
        })

        // console.log(this.state.godown)
    }

    closeAllForm(){
        if(this.state.showForm===true && this.state.vip===false || this.state.showMasuk===true && this.state.vip===false){
                
            this.setState({
                showForm: false,
                showMasuk: false
            })
        }
        else if(this.state.vip==true){
            this.setState({
                vip:false
            })
        }
    }

    showForm(){

        this.closeAllForm()

        this.setState({
            vip:true,
            showForm: !this.state.showForm
        })
    }

    hideForm(){
        this.setState({
            vip:true,
            showForm: false,
            showMasuk: false
        })
    }

    showMasuk(){

        this.closeAllForm()

        this.setState({
            vip:true,
            showMasuk: !this.state.showMasuk
        })
    }

    showAccKit(){

        this.closeAllForm()

        this.setState({
            vip:true,
            accKit: !this.state.accKit
        })
    }

    hideMasuk(){
        this.setState({
            vip:true,
            showMasuk: false
        })
    }

    showLogin(){
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow='auto'
    }

    redirectLogin(){
        window.location.replace('/login');
    }

    redirectCari(){
        window.location.replace('/cari');
    }

    async search(){
        let a = document.getElementById('searchbar').value
        if(a==''){
            let t = this.setState({
                resultSearch:[]
            })

            return
        }else{
            Axios.post('http://localhost:8000/api/search', {
                keyword: document.getElementById('searchbar').value
            }).then(res => {
                this.setState({
                    resultSearch: []
                })

                for (const r of res.data.data) {
                    let data = <Link className='no_decoration' to={'/detail/'+r.id}>
                        <div style={{
                            width: '400px',
                            height: '60px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems:'center',
                            // justifyContent:'space-between',
                        }} className='hoverable'>
                            <div style={{ margin: '5px' }} className='green no_decoration'>{r.name}</div>
                            <div style={{ margin: '5px', fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                className='no_decoration'>
                                {r.address}</div>
                        </div>
                    </Link>

                    this.setState({
                        resultSearch: [...this.state.resultSearch, data]
                    })
                }
            })
        }
    }


    componentDidMount(){
        
        // this.search()

        if(window.innerWidth < 500){
            this.setState({
                dropdown: true
            })
        }

        window.addEventListener('click', () => {
            if(this.state.showForm===true && this.state.vip===false || this.state.showMasuk===true && this.state.vip===false){
                
                this.setState({
                    showForm: false,
                    showMasuk: false
                })
            }
            else if(this.state.vip==true){
                this.setState({
                    vip:false
                })
            }
        })
        

        window.addEventListener('resize', ()=>{
            if(window.innerWidth < 500){
                this.setState({
                    dropdown: true
                })
            }
            else{
                this.setState({
                    dropdown: false
                })
            }
        }
        )
    }

    goHome(){
        window.location.replace('/')        
    }

    logout(){
        let token
        if(window.localStorage.token && window.localStorage.name){
            token = window.localStorage.token
        }else if(window.sessionStorage.token && window.sessionStorage.name){
            token = window.sessionStorage.token
        }

        Axios.post('http://localhost:8000/api/logout', {
            token: token
        }).then(
            res=>{
                console.log(res.data.message)
            }
        )

        window.location.reload()
        if(window.localStorage.token && window.localStorage.name){
            window.localStorage.clear();
        }else if(window.sessionStorage.token && window.sessionStorage.name){
            window.sessionStorage.clear();
        }
    }
    
    render(){
        let searchForm = this.state.showForm ? (
        <form style={{
            zIndex: 500,
            width: '200px',
            marginRight: '10vw',
            right: 0
        }} className="menu_search_form" method='POST'>
            <ul className='carikos_menu'>
                <li className='carikos_menu_item' onClick={this.redirectCari}>cari kos</li>
                <li className='carikos_menu_item'>
                    <Link to='/premium' className='no_decoration' style={{color:'black', width:'100%', height:'100%'}}>
                    Langganan Premium
                    </Link>
                </li>
                {localStorage.type==2 || sessionStorage.type==2?<li className='carikos_menu_item'>
                    <Link to='/history-premium' className='no_decoration' style={{color:'black', width:'100%', height:'100%'}}>
                    History Premium
                    </Link>
                </li>:''}
            </ul>
        </form>
        ):''

        let resultS = this.state.resultSearch

        let masukForm = this.state.showMasuk ? (
            <form style={{
                zIndex: 500,
                width: '200px',
                right: 0
            }} className="menu_search_form" method='POST'>
                <ul className='carikos_menu'>
                    <li className='carikos_menu_item' onClick={this.showLogin.bind(this)}>Sebagai Pencari</li>
                    <li className='carikos_menu_item' onClick={this.redirectLogin}>Sebagai Pemilik</li>
                </ul>
            </form>
            ):''

            let accountKit = this.state.accKit ? (
                <form style={{
                    zIndex: 500,
                    width: '200px',
                    right: 0
                }} className="menu_search_form" method='POST'>
                    <ul className='carikos_menu'>
                        <Link to={this.props.nav[2].profile} className='no_decoration gray'><li className='carikos_menu_item'>Profile</li></Link>
                        {this.props.nav[2].link?<Link to={this.props.nav[2].link} className='no_decoration gray'><li className='carikos_menu_item'>Manage</li></Link>:''}
                        {this.props.nav[2].chat?<Link to={this.props.nav[2].chat} className='no_decoration gray'><li className='carikos_menu_item'>History</li></Link>:''}
                        <Link onClick={this.logout} className='no_decoration gray'><li className='carikos_menu_item'>Log out</li></Link>
                    </ul>
                </form>
                ):''


        let hamburg = (
            <img src={hamburger} style={{
                width: '30px',
                height: '30px',
                margin: '15px',
                marginRight: '20px',
                float: 'right',
                position: 'relative',
                zIndex: 9990,
                top: 0
            }} className='menu_item' onClick={this.showDown.bind(this)}/>
        )


        let decide = this.state.dropdown ? hamburg:''
        let menuright = this.state.dropdown ? '':'menu_right'

        let kiri = this.state.godown?{left:'-80vw', transition:'1s'}:{}
        let loginPencari = this.state.loginPencari?<FloatLogin apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/>:''

        let searchInput = this.props.mode == 'desktop' && window.location.pathname!='/'?
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        }}>
            <form onSubmit={()=>window.location.href='/cari'}>
                <input style={{width:'400px'}} autoComplete='off'
                id='searchbar' onChange={()=>this.search()} type='text' className='btnIjo nav-search' placeholder='cari kos ...'></input>

            </form>
            <div style={{
                position:'absolute',
                width:'100%',
                top:'50px',
                display:'flex',
                flexDirection:'column'
            }}>
                {resultS}
            </div>
        </div>
            :''

        return(
            <>
            <nav style={kiri} className="menu">
                    <span style={{
                        backgroundImage: 'url(' + this.props.logobarbar + ')',
                        cursor: 'pointer'
                    }} className="menu_logo" onClick={this.goHome}>
                        <a className="title">barbarkos.com</a>
                    </span>
                    {searchInput}
                    <div style={{height:'100%', width:'20px'}}>
                        <Link to='/login-admin'></Link>
                    </div>

                    <div className={menuright}>
                        {decide}
                        <Navigation nav={this.props.nav}
                        accKit={this.showAccKit}
                        showForm={this.showForm} 
                        hideForm={this.hideForm} 
                        tis={this} 
                        dropdown={this.state.dropdown} 
                        godown={this.state.godown}
                        showMasuk = {this.showMasuk}
                        hideMasuk = {this.hideMasuk}
                        />
                       
                    </div>
          </nav>
          {searchForm}
          {accountKit}
          {masukForm}
          {loginPencari}

          
          </>
        );
    }
}




export default NavBar;