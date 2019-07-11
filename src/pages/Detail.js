import React, {Component} from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import header from '../assets/header.jpg'
import Reco from '../components/Reco';
import premium from '../assets/premium.svg'
import promote from '../assets/promote.svg'
import {Link, withRouter} from 'react-router-dom'
import L from 'leaflet'
import Axios from 'axios';
import { runInNewContext } from 'vm';
import Review from '../components/Review';
import Rating from '../components/Rating';
import BubPop from '../components/BubPop';

import BubblePop from '../components/BubblePop';
import Loading from '../containers/Loading';


class Detail extends Component{
    constructor(){
        super()

        this.state={
            mapLoaded:false,
            headerType: 'banner',
            info:'',
            recoloaded:false,
            view:false,
            roomf:[],
            publicf: [],
            reviews:[],
            loginPencari:false,
            choose:'detail',
            favorited:false,
            loading:false,
            reviewcleanliness:0,
            reviewroomf:0,
            reviewpublicf:0,
            reviewsecurity:0,
            rating:0,
            pop:'',
            reporting:false
        }
    }

    showLogin(){
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow='auto'
    }


    async getPropertyById(){
        var id = this.props.match.params.id
        let x = Axios.get('http://localhost:8000/api/getPropertyById?id='+id).then(res=>{
            let type = res.data.propertiable_type === 'App\\apartments' ? 'apartements' : 'houses'
            this.setState({
                info: res.data,
                type: type,
                roomf: [],
                publicf:[],
                properties: []
            })
            console.log(res.data)

            for(const r of res.data.facilities){
                let tagged = <><span style={{margin:'10px'}} className='small-text green'>
                    <img className='img-facilities' src={'http://localhost:8000/roomf/' + r.roomf_id[0].icon}></img>
                </span></>
                
                this.setState({
                    roomf:[...this.state.roomf, tagged]
                })
            }
            for(const r of res.data.public_facilities){
                let tagged = <><span style={{margin:'10px'}} className='small-text green'>
                    <img className='img-facilities' src={'http://localhost:8000/publicf/' + r.publicf_id[0].icon}></img>
                </span></>
                
                this.setState({
                    publicf:[...this.state.publicf, tagged]
                })
            }
            
            // this.loadMap(res.data.latitude, res.data.longitude)

        })


        await x
        this.checkFavorite()
        
        var id = localStorage.id?localStorage.id:sessionStorage.id
        if(id!=''){
            this.addHistory()
        }

    }


    componentWillMount(){
        // this.loadMap()
    }

    componentDidMount(){
        this.getPropertyById()
        // this.checkFavorite()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.id !== nextProps.match.params.id) {
            window.location.reload()
        }
     }

    loadMap=()=>{
        // var L = window.L
        var lat = lat;
        var long = long;


        if (this.state.mapLoaded==false) {
            this.setState({
                mapLoaded:true
            })

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    lat = this.state.info.latitude?this.state.info.latitude:0;
                    long = this.state.info.longitude?this.state.info.longitude:0;
                    this.setState({
                        lat: lat,
                        long: long
                    })

                    var mymap = L.map('map').setView([lat, long], 17);
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZG91Z2xhc3N0aG9tYXMiLCJhIjoiY2p2OHNkYmR5MGU3bTRkbzRsdnFxZnV0NiJ9.H6mZ7MiojSngltoufzk7tw'
                    }).addTo(mymap);

                    console.log(lat, long)
                    var mark = L.marker(
                        L.latLng(
                            parseFloat(lat),
                            parseFloat(long)
                        )
                    ).addTo(mymap);


                    // mark.dragging.enable()
                }.bind(this));
            }
        }
        
    }

    getAllProperty() {
        
        if(this.state.recoloaded==false){
            Axios.get('http://localhost:8000/api/getAllProperty?type='+this.state.type+'&latitude='+this.state.lat+"&longitude="+this.state.long+"&perPage=10", {
            }).then(
                res => {
                    this.setState({
                        properties: [],
                        recoloaded:true
                    })
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
        
    }


    incrementView(){
        if(this.state.view==false){
            this.setState({
                view:true
            })
            Axios.get('http://localhost:8000/api/incrementView?property_id='+this.state.info.id).then(
                res =>{
                    
                }
            )
        }
        
    }

    getFacility(){
        // if(this.state.view==false){
        //     let arrRes = this.state.info.facilities
        //     for (let res of arrRes){
        //         console.log(res.roomf_id[0].icon)
        //         let tagged = <><span className='small-text green'>
        //             <img className='img-facilities' src={'http://localhost:8000/roomf/' + res.roomf_id[0].icon}></img>
        //         </span></>
                
        //         this.setState({
        //             roomf:[...this.state.roomf, tagged]
        //         })
        //     }
        // }
    }

    goReply(id){
        if(document.getElementById(id)){
            document.getElementById(id).style.display=''
            var idbtn = id.split('_')[0];
            console.log(idbtn)
            document.getElementById(idbtn).style.display = 'none'
        }
    }

    goCancel(id){
        if(document.getElementById(id)){
            document.getElementById(id).style.display='none'
            var idbtn = id.split('_')[0];
            document.getElementById(idbtn).style.display = ''
        }
    }

    sendReview(){
        var property_id = this.state.info.id
        Axios.post('http://localhost:8000/api/insertReview',{
            token:window.localStorage.token?window.localStorage.token:window.sessionStorage.token,
            property_id:property_id,
            contents:document.getElementById('txt-review').value,
            user_id:window.localStorage.id?window.localStorage.id:window.sessionStorage.id
        }).then(res=>{
            this.setState({
                message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
            document.getElementById('txt-review').value = ''
            this.getReviewByPropertyId()
        }).catch(err=>{
            this.setState({
                message:<><BubblePop message={err.response.data.message?err.response.data.message:'login first'} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
        })
    }

    sendRating(){
        var property_id = this.state.info.id
        Axios.post('http://localhost:8000/api/insertRating',{
            token:window.localStorage.token?window.localStorage.token:window.sessionStorage.token,
            property_id:property_id,
            contents:document.getElementById('txt-review').value,
            user_id:window.localStorage.id?window.localStorage.id:window.sessionStorage.id,
            cleanliness:this.state.reviewcleanliness,
            roomf:this.state.reviewroomf,
            publicf:this.state.reviewpublicf,
            security:this.state.reviewsecurity
        }).then(res=>{
            this.setState({
                message:<><BubblePop message={res.data} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
            document.getElementById('txt-review').value = ''
            this.getReviewByPropertyId()
        }).catch(err=>{
            this.setState({
                message:<><BubblePop message={err.response.data.message?err.response.data.message:'login first'} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/></>
            })
        })
    }

    replyReview(parent_id){
        var property_id = this.state.info.id
        var inputid = parent_id+'_txt'

        Axios.post('http://localhost:8000/api/insertReview',{
            token:window.localStorage.token?window.localStorage.token:window.sessionStorage.token,
            property_id:property_id,
            contents:document.getElementById(inputid).value,
            user_id:window.localStorage.id?window.localStorage.id:window.sessionStorage.id,
            parent_id:parent_id
        }).then(res=>{
            alert(res.data)
            document.getElementById(inputid).value = ''
        })
    }


    fetchReview(data){
        console.log(data.contents)
        let tagged =<>
            <div style={{
                paddingLeft: '20px',
                fontSize: '14px'
            }}>
                <div style={{ color: 'green', padding: '2px' }}>{data.user_id.name}</div>
                <div style={{ color: 'dimgray', padding: '2px' }}>{data.contents}</div>
                <button id={data.id} onClick={() => { this.goReply(data.id+'_input') }}>reply</button>
                <div id={data.id+'_input'} style={{ display: 'none' }}>
                    <input id={data.id+'_txt'} style={{ width: '30%', marginRight: '20px' }} type="text" className="btnIjo"></input>
                    <button onClick={()=>{this.replyReview(data.id)}} className='btnIjo-selected'>SEND</button>
                    <button className='btnOrange' onClick={() => { this.goCancel(data.id+'_input') }}>Cancel</button>
                
                    {child}

                </div>
            </div>
        </>
        
        let child = []
        
        var count = data.children?data.children.length:0
        if(data.children!=null){
            for(const c of data.children){
                child = [...child, this.fetchReview(c)]
                count--
                if(count==0) return tagged
            }
            
        }
        else return tagged
    }


    getReviewByPropertyId(){
        if(this.state.view==false){
            var property_id = this.state.info.id
            Axios.post('http://localhost:8000/api/getReviewByPropertyId',{
                property_id:property_id,
            }).then(async res=>{
                this.setState({
                    reviews:[]
                })

                
                for(const r of res.data.data){
                    // console.log(r)
                    var tagged
                    if(res.data.next_page_url!=null){
                        tagged = <div 
                        onClick={()=>{this.setState({choose:'review'})}}
                        className='btnIjo-selected no_decoration'
                        style={{float:'right'}}
                        >View all</div>
                    
                    }
                    let a = this.setState({
                        reviews:[...this.state.reviews, <Rating tis={this} reload={this.getReviewByPropertyId} info={this.state.info} data={r} child={r.children}/>],
                        viewAllReview:tagged
                    })
                    await a
                }
                
                
            })

            this.getRatingAverage()

        }
    }

    getRatingAverage(){
        if(this.state.view==false){
            var property_id = this.state.info.id
            Axios.post('http://localhost:8000/api/getRatingAverage',{
                property_id:property_id,
            }).then(async res=>{
                this.setState({
                    rating:res.data
                })

                
            })
        }
    }

    addFavorite(){
        this.setState({
            loading:true
        })
        // console.log(this.state.info.id)
        Axios.post('http://localhost:8000/api/addFavorite',{
            user_id:this.props.login.id,
            property_id: this.state.info.id,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            if(res.data=='success'){
                this.setState({
                    loading:false,
                    favorited:true
                })
            }
        })
    }

    checkFavorite(){
        console.log(this.state.info)
        this.setState({
            loading:true
        })
        // console.log(this.state.info.id)
        Axios.post('http://localhost:8000/api/checkFavorite',{
            user_id:localStorage.id?localStorage.id:sessionStorage.id,
            property_id: this.state.info.id,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            if(res.data==true){
                this.setState({
                    loading:false,
                    favorited:true
                })
            }else{
                this.setState({
                    loading:false,
                    favorited:false
                })
            }
        })
    }

    deleteFavorite(){
        this.setState({
            loading:true
        })
        // console.log(this.state.info.id)
        Axios.post('http://localhost:8000/api/deleteFavorite',{
            user_id:this.props.login.id,
            property_id: this.state.info.id,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            if(res.data=='success'){
                this.setState({
                    loading:false,
                    favorited:false
                })
            }
        })
    }

    addHistory(){
        this.setState({
            loading:true
        })
        // console.log(this.state.info.id)
        Axios.post('http://localhost:8000/api/addHistory',{
            user_id:this.props.login.id,
            property_id: this.state.info.id,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            
        })
    }

    goReport(){
        this.setState({
            loading:true,
            pop:''
        })

        Axios.post('http://localhost:8000/api/goReport',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            user_id: localStorage.id?localStorage.id:sessionStorage.id,
            property_id: this.state.info.id,
            contents: document.getElementById('report-contents').value
        }).then(res=>{
            
            let tagged = <BubPop message={res.data}></BubPop>


            this.setState({
                loading:false,
                pop: tagged,
                reporting: false
            })
        })
    }

    render(){
        let delapanlimapuluh = window.innerWidth<=850?{
            borderRadius: '5px',
            width: '90vw',
            height: '90px',
            margin: '0 auto',
            backgroundColor: 'white',
            marginTop: '45px',
            padding: '15px',
            alignSelf: 'center',
        }:{
            borderRadius: '5px',
            width: '65vw',
            height: '90px',
            margin: '0 auto',
            backgroundColor: 'white',
            marginTop: '45px',
            padding: '15px',
            alignSelf: 'center',
        }

        let errm = this.state.message
        let viewallreviews = this.state.viewAllReview
        let isi = this.state.info.latitude?this.loadMap():''
        let reco = this.state.info.latitude?this.getAllProperty():''
        let incView = this.state.info.id?this.incrementView():''
        let getReview = this.state.info.id?this.getReviewByPropertyId():''
        let faci = this.state.info.id?this.getFacility():''
        let isireco = this.state.properties
        let facilities = this.state.roomf
        let publicf = this.state.publicf
        let reviews = this.state.reviews
        let loading = this.state.loading?<Loading></Loading>:''

        let fav_container = this.props.mode=='desktop'?'favorite-container':'fav-container'
        // let loadsimap = this.state.headerType=='map'?this.loadMap():''
        
        var mapni = this.props.mode=='desktop'?<><link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossOrigin=""></script>
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        {/* {this.loadMap()} */}
        <div style={this.state.headerType!='map'?{position:'absolute', zIndex:'-1000', visibility:'hidden'}:{}} id="map" className={this.state.headerType=='map'?'map-detail':'map-detail'}></div></>
        :
        <><link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossOrigin=""></script>
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <div style={this.state.headerType!='map'?{position:'absolute', zIndex:'-1000', visibility:'hidden'}:{}} id="map" className={this.state.headerType=='map'?'map-detail-mobile':'map-detail-mobile'}></div></>

        document.body.style.overflowX = 'hidden'
        return (
            <>
                {loading}
                {this.state.pop}
                <div className='navstick' style={{zIndex: 1000, position:'relative'}}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode}/>
                </div>

                {errm}
                <div style={{
                    position:'absolute',
                    width:'50px',
                    height:'150px',
                    left:0,
                    top:200,
                    zIndex:99,display:'flex',
                    flexDirection:'column'
                }}>
                    <button className='btnIjo' onClick={()=>{this.setState({headerType:'banner'})}} style={{height:'50px', fontSize:'13px', padding:0}}>Banner</button>
                    <button className='btnIjo' onClick={()=>{this.setState({headerType:'map'})}} style={{height:'50px', fontSize:'13px', padding:0}}>Map</button>
                    <button className='btnIjo' onClick={()=>{this.setState({headerType:'pictures'})}} style={{height:'50px', fontSize:'13px', padding:0}}>Pictures</button>
                </div>

                <div style={{
                    position:'absolute',
                    width:'100vw',
                    height:'50px',
                    top:60,
                    zIndex:99,
                }}>
                    {localStorage.token || sessionStorage.token?
                    
                        
                            this.state.reporting?
                            <div style={{display:'flex',
                            flexDirection:'row',
                            float:'right'}}>
                                <input id='report-contents' type='text' className='btnIjo' style={{
                                    width:'60vw'
                                }}></input>
                                <button className='btnOrange' 
                                onClick={()=>this.goReport()}
                                style={{height:'50px', width:'80px', fontSize:'13px', padding:0}}>Report</button>
                                <button className='btnIjo' 
                                onClick={()=>this.setState({reporting:false})}
                                style={{height:'50px', width:'80px', fontSize:'13px', padding:0}}>Cancel</button>
                            </div>
                            :<button className='btnOrange' 
                            onClick={()=>this.setState({reporting:true})}
                            style={{height:'50px', width:'80px', fontSize:'13px', float:'right', padding:0}}>Report</button>
                        
                        
                        
                    
                    :''}
                </div>

                <div style={{
                    backgroundImage:' url('+'http://localhost:8000/images/banner/'+this.state.info.banner_id+')',
                    backgroundSize: 'cover',
                    width: '100vw',
                    float: 'inherit',
                    height: '65vh',
                    position: 'relative',
                    paddingTop: '20vh',
                    paddingBottom: '5vh'
                }} className={this.state.headerType=='banner'?'':'hide'}></div>

                {/* {this.state.headerType=='map'?mapni:''} */}
                {mapni}
                
                <div className={fav_container}>
                    <div id="name" style={{fontSize:'20px'}} className='green'>{this.state.info.name}</div>
                    <div>
                        <i style={{color:'#ffaa3b'}} 
                        onClick={()=>{this.setState({reviewcleanliness:1})}}
                        className={this.state.rating>=1?'fas fa-star':this.state.rating>=0.1?'fas fa-star-half-alt':'far fa-star'}></i>
                        <i style={{color:'#ffaa3b'}} 
                        onClick={()=>{this.setState({reviewcleanliness:2})}}
                        className={this.state.rating>=2?'fas fa-star':this.state.rating>=1.1?'fas fa-star-half-alt':'far fa-star'}></i>
                        <i style={{color:'#ffaa3b'}} 
                        onClick={()=>{this.setState({reviewcleanliness:3})}}
                        className={this.state.rating>=3?'fas fa-star':this.state.rating>=2.1?'fas fa-star-half-alt':'far fa-star'}></i>
                        <i style={{color:'#ffaa3b'}} 
                        onClick={()=>{this.setState({reviewcleanliness:4})}}
                        className={this.state.rating>=4?'fas fa-star':this.state.rating>=3.1?'fas fa-star-half-alt':'far fa-star'}></i>
                        <i style={{color:'#ffaa3b'}} 
                        onClick={()=>{this.setState({reviewcleanliness:5})}}
                        className={this.state.rating>=5?'fas fa-star':this.state.rating>=4.1?'fas fa-star-half-alt':'far fa-star'}></i>
                        <span style={{color:'gray'}}>{this.state.rating}</span>
                    </div>
                    <div style={this.props.mode=='desktop'?{
                        float: 'right'
                    }:{

                    }}>
                        <div>
                        <Link 
                        to=
                        {{pathname:'/chat', 
                        state:{user: this.state.info.owner_id?this.state.info.owner_id:0}}}><button className='btnOrange-selected'>{this.state.info.owner_id?'Hubungi '+this.state.info.owner_id.name:'Kirim Pesan'}</button></Link>


                        {this.props.login.type==1?
                        <button onClick={()=>{this.state.favorited==false?this.addFavorite():this.deleteFavorite()}}
                        className='btnIjo'><i style={this.state.favorited==true?{color:'red'}:{}} className='fas fa-heart'></i></button>:
                        ''}
                        </div>
                        <Link style={{
                            color:'green',
                            marginTop:'10px',
                            float:'right'
                        }} to={this.state.info.owner_id?'/owner/'+this.state.info.owner_id.id:''}>
                                {this.state.info.owner_id?this.state.info.owner_id.name:''}
                        </Link>
                    </div>
                    <div style={{color:'orangered', fontSize:'20px'}}>{this.state.info.price?this.state.info.price[0].yearly_price?this.state.info.price[0].yearly_price+'/year':'':''}</div>
                    <div style={{color:'orangered', fontSize:'20px'}}>{this.state.info.price?this.state.info.price[0].monthly_price?this.state.info.price[0].monthly_price+'/month':'':''}</div>
                    <div style={{color:'orangered', fontSize:'20px'}}>{this.state.info.price?this.state.info.price[0].weekly_price?this.state.info.price[0].weekly_price+'/week':'':''}</div>
                    <div style={{color:'orangered', fontSize:'20px'}}>{this.state.info.price?this.state.info.price[0].daily_price?this.state.info.price[0].daily_price+'/day':'':''}</div>
                    <div>
                        <span style={{color:'green'}}>{this.state.info.city_id}</span> - 
                        <span className='green small-text'>{this.state.info.address}</span>
                    </div>
                    <div style={{color:'gray'}}>
                        {this.state.info.total_views?this.state.info.total_views+'x views':'no views'}
                    </div>

                </div>
                
                <div className={fav_container}>
                    <div style={{padding:'0px', 
                    borderBottom:'0px solid #FFFFFF', 
                    borderRadius:'0px'}} className='btnIjo-select'>
                        <button className={this.state.choose=='detail'?'btnIjo':'btnIjo-select'}
                        onClick={()=>{this.setState({choose:'detail'})}}
                        style={this.state.choose=='detail'?{borderBottom:'0px solid #FFFFFF', borderRadius:'0px 15px 0px 0px', width:'50%'}:
                        {width:'50%'}}>Detail</button>
                        <button className={this.state.choose=='review'?'btnIjo':'btnIjo-select'}
                        onClick={()=>{this.setState({choose:'review'})}}
                        style={this.state.choose=='review'?{borderBottom:'0px solid white', borderRadius:'15px 0px 0px 0px', width:'50%'}:
                        {width:'50%'}}>Review</button>
                    </div>
                    
                </div>


                <div style={this.state.choose!='detail'?{display:'none'}:{}} className={fav_container}>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        <div style={this.props.mode!='mobile'?{width:'33.33%'}:{width:'100%'}} className='container-detail'>
                            <div className='green'>
                                Room facilities
                            </div>
                            {facilities}
                        </div>

                        <div  style={this.props.mode!='mobile'?{width:'33.33%'}:{width:'100%'}}className='container-detail'>
                            <div className='green'>
                                Public facilities
                            </div>
                            {publicf}
                        </div>

                        <div style={this.props.mode!='mobile'?{width:'33.33%'}:{width:'100%'}} className='container-detail'>
                            <div className='green'>
                                Additional Fee
                            </div>
                            <div style={{color:'orangered', fontSize:'18px'}}>{this.state.info.fee?this.state.info.fee:'-'}</div>
                        </div>
                    </div>

                    {/* -------- */}
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}}  className='container-detail'>
                            <div className='green'>
                                {this.state.type=='apartements'?'Floor':'Room Left'}
                            </div>
                            <div style={{color:'orangered', fontSize:'18px'}}>{this.state.info.propertiable?this.state.info.propertiable.room_left:'no info'}</div>
                        </div>

                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}} className='container-detail'>
                            <div className='green'>
                                {this.state.type=='apartements'?'Unit Condition':'Gender Type'}
                            </div>
                            <div style={{color:'orangered', fontSize:'18px'}}>{this.state.info.propertiable?this.state.info.propertiable.gender_type?this.state.info.propertiable.gender_type:'-':'no info'}</div>
                        </div>

                        <div style={this.props.mode!='mobile'?{width:'25%'}:this.state.type=='houses'?{display:'none'}:{width:'100%'}}  className='container-detail'>
                            <div className='green'>
                                {this.state.type=='apartements'?'Unit Type':''}
                            </div>
                            <div style={{color:'orangered', fontSize:'18px'}}>{this.state.info.propertiable?this.state.info.propertiable.unit_type?this.state.info.propertiable.unit_type:'':''}</div>
                        </div>

                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}} className='container-detail'>
                            <div className='green'>
                                {this.state.type=='apartements'?'Parking':'Parking'}
                            </div>
                            <div style={{color:'orangered', fontSize:'18px'}}>{this.state.info.propertiable?this.state.info.propertiable.parking?this.state.info.propertiable.parking:'no parking':'no info'}</div>
                        </div>
                    </div>

                    {/* -----------                     */}
                    <div className='container-detail'>
                        <div className='green'>
                            Description
                        </div>
                        <div style={{color:'dimgray', fontSize:'15px'}}>{this.state.info.description}</div>
                    </div>
                    <div className='container-detail'>
                        <div className='green'>
                            Information
                        </div>
                        <div style={{color:'dimgray', fontSize:'15px'}}>{this.state.info.information}</div>
                    </div>
                    {viewallreviews}
                    {reviews.length>3?<button onClick={()=>{this.setState({choose:'review'})}} style={{float:'right'}} className='btnIjo-select'>view all review</button>:''}
                    {reviews.slice(0, 3)}
                
                </div>

                {/* --------------------review--------------------- */}
                <div style={this.state.choose!='review'?{display:'none'}:{}} className={fav_container}>
                    <div style={this.props.mode=='desktop'?{display:'flex', maxWidth:'60%'}:this.props.mode=='tablet'?{display:'flex'}:{}}>
                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}}>
                            Cleanliness
                            <div>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewcleanliness:1})}}
                                className={this.state.reviewcleanliness>=1?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewcleanliness:2})}}
                                className={this.state.reviewcleanliness>=2?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewcleanliness:3})}}
                                className={this.state.reviewcleanliness>=3?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewcleanliness:4})}}
                                className={this.state.reviewcleanliness>=4?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewcleanliness:5})}}
                                className={this.state.reviewcleanliness>=5?'fas fa-star':'far fa-star'}></i>
                            </div>
                        </div>
                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}}>
                            Room Facility
                            <div>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewroomf:1})}}
                                className={this.state.reviewroomf>=1?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewroomf:2})}}
                                className={this.state.reviewroomf>=2?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewroomf:3})}}
                                className={this.state.reviewroomf>=3?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewroomf:4})}}
                                className={this.state.reviewroomf>=4?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewroomf:5})}}
                                className={this.state.reviewroomf>=5?'fas fa-star':'far fa-star'}></i>
                            </div>
                        </div>
                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}}>
                            Public Facility
                            <div>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewpublicf:1})}}
                                className={this.state.reviewpublicf>=1?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewpublicf:2})}}
                                className={this.state.reviewpublicf>=2?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewpublicf:3})}}
                                className={this.state.reviewpublicf>=3?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewpublicf:4})}}
                                className={this.state.reviewpublicf>=4?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewpublicf:5})}}
                                className={this.state.reviewpublicf>=5?'fas fa-star':'far fa-star'}></i>
                            </div>
                        </div>
                        <div style={this.props.mode!='mobile'?{width:'25%'}:{width:'100%'}}>
                            Security
                            <div>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewsecurity:1})}}
                                className={this.state.reviewsecurity>=1?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewsecurity:2})}}
                                className={this.state.reviewsecurity>=2?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewsecurity:3})}}
                                className={this.state.reviewsecurity>=3?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewsecurity:4})}}
                                className={this.state.reviewsecurity>=4?'fas fa-star':'far fa-star'}></i>
                                <i style={{color:'rgb(4, 172, 54)'}} 
                                onClick={()=>{this.setState({reviewsecurity:5})}}
                                className={this.state.reviewsecurity>=5?'fas fa-star':'far fa-star'}></i>
                            </div>
                        </div>
                    </div>
                    
                    <input id='txt-review' style={{width:'60%', marginRight:'20px'}} type="text" className="btnIjo"></input>
                    <button onClick={()=>{this.sendRating()}} className='btnIjo-selected'>SEND</button>
                </div>

                <div style={this.state.choose!='review'?{display:'none'}:{}} className={fav_container}>
                    Reviews 
                    {reviews}
                    
                </div>

                


                <div style={{
                    margin: '0 auto',
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '15px',
                }} className="biji">
                    {isireco}
                    

                </div>
            </>
        )
    }

}

export default withRouter(Detail)