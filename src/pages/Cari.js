import React, {PureComponent} from 'react'
// import L from 'leaflet'
// render(map, document.getElementById('map-container'))
// import React from 'react'
import L from 'leaflet'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import Reco from '../components/Reco';
import premium from '../assets/premium.svg'
import promote from '../assets/promote.svg'
import header from '../assets/header.jpg'
import BC from '../components/BC';
import Axios from 'axios';
import { CLIENT_RENEG_LIMIT } from 'tls';
import Loading from '../containers/Loading';


class Cari extends PureComponent{

    constructor(props){
        super()

        this.state={
            filterDown:false,
            refresh:null,
            mapLoaded:false,
            lat:0,
            long:0,
            type:'apartements',
            properties:[],
            goloading:true
        }

        // document.onscroll = async (e)=>{
        //     console.log(document.documentElement.scrollTop, window.innerHeight, document.documentElement.scrollHeight)
        //     if(document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight){
        //         alert('ahayy')
        //     }
        // }

        
        
    }

    loadMap=()=>{
        // var L = window.L
        var lat = 0;
        var long = 0;


        if (this.state.mapLoaded==false) {
            this.setState({
                mapLoaded:true
            })

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                    this.setState({
                        lat: lat,
                        long: long
                    })
                    this.getAllProperty()

                    var mymap = L.map('map').setView([lat, long], 15);
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZG91Z2xhc3N0aG9tYXMiLCJhIjoiY2p2OHNkYmR5MGU3bTRkbzRsdnFxZnV0NiJ9.H6mZ7MiojSngltoufzk7tw'
                    }).addTo(mymap);

                    var mark = L.marker(
                        L.latLng(
                            parseFloat(lat),
                            parseFloat(long)
                        )
                    ).addTo(mymap);


                    mark.on('dragend', function (event) {
                        var latlng = event.target.getLatLng();
                        console.log(latlng.lat, latlng.lng)
                        this.setState({
                            lat: latlng.lat,
                            long: latlng.lng
                        })
                        this.getAllProperty()
                    }.bind(this));
                    mark.dragging.enable()
                }.bind(this));
            }
        }
        
    }

    getAllProperty() {
        this.setState({
            properties: [],
            goloading:true
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
                        properties: [...this.state.properties, tagged],
                        goloading:false
                    })
                }

            }
        )
    }

    changeFil(){
        this.setState({
            filterDown: !this.state.filterDown
        })
    }

    componentDidMount()
    {
        document.addEventListener('DOMContentLoaded', this.loadMap);
        document.getElementById('caribox').addEventListener('scroll', ()=>{
            var scrollTop = document.getElementById('caribox').scrollTop;
        var scrollHeight = document.getElementById('caribox').scrollHeight; // added
        var offsetHeight = document.getElementById('caribox').offsetHeight;
        // var clientHeight = document.getElementById('box').clientHeight;
        var contentHeight = scrollHeight - offsetHeight; // added
        if (contentHeight <= scrollTop) // modified
        {
            console.log('end')
        }
        })
    }

    componentDidUpdate(){
        // if (this.state.mapLoaded==false) {
            // document.addEventListener('DOMContentLoaded', this.loadMap);
                // this.loadMap()
        // }
    }

    goKost(){
        async function a(tis){
            let x = tis.setState({
                type:'houses'
            })

            await x
            tis.getAllProperty()
        }
        a(this)
    }

    goApartement(){
        async function a(tis){
            let x = tis.setState({
                type:'apartements'
            })

            await x
            tis.getAllProperty()
        }
        a(this)
    }

    render(){
        let navigations = [
            {label:'Cari Kos', link:'/'},
            {label:'Promosi Iklan Anda', link:'/'},
            {label:'Masuk', link:'/'},
          ]
        var updown = this.state.filterDown?'⌃':'⌄'
        var mapni = this.props.mode=='desktop'?<><link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossOrigin=""></script>
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <div style={{zIndex: -999}} id="map" className='map'></div></>:
        <><link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossOrigin=""></script>
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <div style={{zIndex: -99}} id="map" className='map-mobile'></div></>

        let loaded = this.props.apptis.state.loaded==true?
        this.loadMap()
        :
        ''
        
        let loading = this.state.goloading?<Loading></Loading>:''

        var filterBox = this.props.mode=='desktop'?
        <div className='filter-box'>
            <div style={{width:'165px', borderRight: '1px solid lightgray'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>CARI KATEGORI</p>
                <button onClick={this.goKost.bind(this)} className={this.state.type == 'houses'?'btnIjo-selected':'btnIjoo'}>
                    Kost
                </button>
                <button onClick={this.goApartement.bind(this)} className={this.state.type == 'apartements'?'btnIjo-selected':'btnIjoo'}>
                    Apartemen
                </button>
            </div>

            <div style={{width:'17%', marginLeft: '15px'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>Tipe Kost</p>
                <select className='select-cari'>
                    <option value='semua'>Semua</option>
                    <option value='putri'>Putri</option>
                    <option value='putra'>Putra</option>
                    <option value='campur'>Campur</option>
                </select>
            </div>

            <div style={{width:'17%', marginLeft: '15px'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>Jangka Waktu</p>
                <select className='select-cari'>
                    <option value='harian'>Harian</option>
                    <option value='mingguan'>Mingguan</option>
                    <option value='bulanan' selected>Bulanan</option>
                    <option value='tahunan'>Tahunan</option>
                </select>
            </div>

            <div style={{width:'17%', marginLeft: '15px'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>Urutkan Berdasar</p>
                <select className='select-cari'>
                    <option value='acak'>Acak</option>
                    <option value='harga-asc'>Harga Terendah</option>
                    <option value='harga-desc'>Harga Tertinggi</option>
                    <option value='kosongpenuh'>Kosong ke Penuh</option>
                    <option value='update'>Update terbaru</option>
                </select>
            </div>

            <div style={{width:'30%', marginLeft: '15px'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>Rentang Harga</p>
                <input type='text' placeholder='Rp 0' className='input-cari'></input>
                <span style={{marginRight:'10px'}}>-</span>
                <input type='text' placeholder='Rp 15000000' className='input-cari'></input>
                <button className='btnIjo-selected'>Set</button>
            </div>
        </div>:<div className='filter-box'>
            <div style={{width:'165px', borderRight: '1px solid lightgray'}}>
                <p style={{width: '100%', fontSize:'15px', marginBottom:'10px'}} className='gray'>CARI KATEGORI</p>
                <button onClick={this.goKost.bind(this)} className={this.state.type == 'houses'?'btnIjo-selected':'btnIjoo'}>
                    Kost
                </button>
                <button onClick={this.goApartement.bind(this)} className={this.state.type == 'apartements'?'btnIjo-selected':'btnIjoo'}>
                    Apartemen
                </button>
            </div>

        </div>

        let cari = this.props.mode=='desktop'?<div className='cari'>
        <span onClick={this.changeFil.bind(this)} style={{width: '100%'}} className='green'>Filter lanjutan <span className='font20 green'></span>{updown}</span>
        
        <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
        <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
        <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
        <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
        <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
    </div>:<div className='cari-full'>
                    <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
                    <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
                    <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
                    <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
                    <Reco premium={premium} promote={promote} header={header} size={'cari'}/>
                </div>


        let properties = this.state.properties

        return(
            <div style={{overflowX:'block', overflowY: 'block'}}>
                <div className='navstick' style={{zIndex: 1000, position:'relative'}}>
                    <NavBar cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode}/>
                </div>
                <BC></BC>
                {loaded}
                {filterBox}
                {loading}

                {this.props.mode!='desktop'?mapni:''}
                <div id='caribox' className='cari'>
                    <span onClick={this.changeFil.bind(this)} style={{ width: '100%' }} className='green'>Filter lanjutan <span className='font20 green'></span>{updown}</span>

                    {properties}
                </div>
                
                {mapni}

            </div>
        )
    }

}
export default Cari